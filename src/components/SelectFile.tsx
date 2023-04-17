import { useState } from "react";

export const SelectFile = () => {
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  // ファイル選択ボタンがクリックされたときの処理
  async function selectFile() {
    const [fileHandle] = await (window as any).showOpenFilePicker();
    const file = await fileHandle.getFile();
    console.log("file", file);
    const blob = await file.arrayBuffer();
    console.log("blob", blob);
    const dataUrl = URL.createObjectURL(new Blob([blob]));
    console.log("dataUrl", dataUrl);

    setImageUrl(dataUrl);
    setFile(file);
  }
  return (
    <div>
      <button onClick={selectFile}>Get File</button>
      {file && <img src={imageUrl} />}
    </div>
  );
};
