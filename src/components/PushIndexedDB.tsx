import { get, set } from "idb-keyval";
import { useState } from "react";

type Image = {
  name: string;
  url: string;
};

export const PushIndexedDB = () => {
  const [imageUrls, setImageUrls] = useState<Image[]>();
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

    // ファイルとディレクトリの一覧
    // for await (const handle of dh.values()) {
    //   if (handle.kind === "file") {
    //     console.log(handle.name);
    //   } else if (handle.kind === "directory") {
    //     console.log(handle.name + "/");
    //   }
    // }
    const files: { name: string; url: string }[] = [];
    async function readFilesFromDirectory(directoryHandle: any) {
      for await (const entry of directoryHandle.values()) {
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
        } else if (entry.kind === "directory") {
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
      <button onClick={pushIndexedDatabase}>Push Indexed Database</button>
      <p>↑キャッシュクリアで削除される</p>
      {imageUrls?.map((v: any, i: number) => (
        <div>
          <img key={i} src={v.url} alt={`Image ${v.name}`} />
        </div>
      ))}
    </div>
  );
};
