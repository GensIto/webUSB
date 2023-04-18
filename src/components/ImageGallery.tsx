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

  return (
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
          .map((file: any, index: any) => (
            <li key={index} style={{ width: "300px" }}>
              <p>{`${file.name}${index + 1}番目`}</p>
              <img
                style={{ width: "300px" }}
                src={URL.createObjectURL(file)}
                alt='咽頭画像'
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
