import { useState } from "react";

interface Image {
  src: string;
}

const ImageGallery: React.FC = () => {
  const [files, setFiles] = useState<any>([]);

  const handleDirInputChange = (e: any) => {
    const fileList = Array.from(e.target.files);
    console.log(fileList);
    setFiles(fileList);
  };

  const handleButtonClick = () => {
    document.getElementById("InputFiles")!.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(files.filter((file: any) => file.name.startsWith("00000001_")));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div style={{ textAlign: "center" }}>
          <button onClick={handleButtonClick}>
            送信する(foldersを選択して下さい)
            <input
              id='InputFiles'
              type='file'
              webkitdirectory=''
              style={{ display: "none" }}
              onChange={handleDirInputChange}
            />
          </button>
        </div>
        <ul>
          {files
            .filter((file: any) => file.name.startsWith("00000001_"))
            .sort((fileA: any, fileB: any) => {
              // 00000001_[001].jpgで比較
              const aNum = parseInt(fileA.name.slice(9, 12));
              const bNum = parseInt(fileB.name.slice(9, 12));
              return aNum - bNum;
            })
            .map((file: any, index: any) => (
              <li key={index} style={{ width: "300px" }}>
                <p>{`${file.name} = ${index + 1}番目`}</p>
                <img
                  style={{ width: "300px" }}
                  src={URL.createObjectURL(file)}
                  alt='咽頭画像'
                />
              </li>
            ))}
        </ul>
        <button type='submit'>送信</button>
      </div>
    </form>
  );
};

export default ImageGallery;
