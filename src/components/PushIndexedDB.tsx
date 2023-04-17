import { get, set } from "idb-keyval";

export const PushIndexedDB = () => {
  const pushIndexedDatabase = async () => {
    // Indexed Database から FileSystemDirectoryHandle オブジェクトを取得
    let dh = await get("dir");

    if (dh) {
      // すでにユーザーの許可が得られているかをチェック
      let permission = await dh.queryPermission({ mode: "readwrite" });
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
    for await (const handle of dh.values()) {
      if (handle.kind === "file") {
        console.log(handle.name);
      } else if (handle.kind === "directory") {
        console.log(handle.name + "/");
      }
    }

    // FileSystemDirectoryHandle オブジェクトを Indexed Database に保存
    await set("dir", dh);
  };

  return (
    <div>
      <button onClick={pushIndexedDatabase}>Push Indexed Database</button>
      <p>↑キャッシュクリアで削除される</p>
    </div>
  );
};
