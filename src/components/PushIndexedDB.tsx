import { get, set } from "idb-keyval";
import { useState } from "react";

type Image = {
  name: string;
  url: string;
};

export const PushIndexedDB = () => {
  const [imageUrls, setImageUrls] = useState<Image[]>();
  const [inputValue, setInputValue] = useState("examination1");

  const pushIndexedDatabase = async () => {
    // Indexed Database から FileSystemDirectoryHandle オブジェクトを取得
    let dh = await get("dir");
    console.log(dh);

    if (dh) {
      // すでにユーザーの許可が得られているかをチェック
      let permission = await dh.queryPermission({ mode: "readwrite" });
      console.log(permission);
      if (permission !== "granted") {
        // ユーザーの許可が得られていないなら、許可を得る（ダイアログを出す）
        permission = await dh.requestPermission({ mode: "readwrite" });
        if (permission !== "granted") {
          throw new Error("ユーザーの許可が得られませんでした。");
        }
      }
    } else {
      // ディレクトリ選択ダイアログを表示
      dh = await (window as any).showDirectoryPicker();
    }

    // 画像URL作成
    const files: { name: string; url: string }[] = [];
    async function readFilesFromDirectory(directoryHandle: any) {
      console.log("directoryHandle.values()", directoryHandle.values());
      for await (const entry of directoryHandle.values()) {
        console.log("entry", entry);
        console.log("entry.kind", entry.kind);
        console.log("entry.name", entry.name);
        if (
          entry.kind === "file" &&
          entry.name.match(/\.(jpg|jpeg|png|gif)$/)
        ) {
          const blob = await entry.getFile();
          const url = URL.createObjectURL(blob);
          files.push({
            name: entry.name,
            url: url,
          });
        } else if (entry.kind === "directory" && entry.name === inputValue) {
          await readFilesFromDirectory(entry);
        }
      }
    }

    await readFilesFromDirectory(dh);
    console.log(files);
    setImageUrls(files);
    console.log(imageUrls);
    // FileSystemDirectoryHandle オブジェクトを Indexed Database に保存
    await set("dir", dh);
  };

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={pushIndexedDatabase}>Push Indexed Database</button>
      <p>↑キャッシュクリアで削除される</p>
      {imageUrls?.map((v: Image, i: number) => (
        <div>
          <p>{`${v.name} = ${i + 1}番目`}</p>
          <img
            style={{ width: "300px" }}
            key={i}
            src={v.url}
            alt={`Image ${v.name}`}
          />
        </div>
      ))}
    </div>
  );
};
