import { useState } from "react";

export const SelectDirectory = () => {
  const [directory, setDirectory] = useState<any>(null);
  // ファルダ選択ボタンがクリックされたときの処理
  async function selectDirectory(): Promise<void> {
    const dirHandle = await (window as any).showDirectoryPicker();
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

    await readFilesFromDirectory(dirHandle);
    setDirectory(files);
  }

  return (
    <div>
      <button onClick={selectDirectory}>Get Directory</button>
      <div>
        {directory &&
          directory.map((file: any, i: number) => (
            <img src={file.url} key={i} />
          ))}
      </div>
    </div>
  );
};
