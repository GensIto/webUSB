import { useState } from "react";

interface ImageFile extends File {
  url: string;
}

const ImageGallery: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const handleDirectoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = Array.from(e.target.files!).filter((file) =>
      file.name.startsWith("00000001_")
    );
    setImageFiles(
      fileList.map((file) =>
        Object.assign(file, { url: URL.createObjectURL(file) })
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    for (let entry of formData.entries()) {
      console.log(entry);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ textAlign: "center" }}>
        <button
          type='button'
          onClick={() => document.getElementById("InputFiles")!.click()}>
          Choose folder(s)
        </button>
        <input
          id='InputFiles'
          type='file'
          webkitdirectory=''
          style={{ display: "none" }}
          onChange={handleDirectoryInputChange}
          multiple
        />
      </div>
      {imageFiles.length > 0 && (
        <ul>
          {imageFiles
            .sort(
              (fileA, fileB) =>
                parseInt(fileA.name.slice(9, 12)) -
                parseInt(fileB.name.slice(9, 12))
            )
            .map((file, index) => (
              <li key={index} style={{ width: "300px" }}>
                <p>{`${file.name} = ${index + 1}番目`}</p>
                <img style={{ width: "300px" }} src={file.url} alt='咽頭画像' />
              </li>
            ))}
        </ul>
      )}
      <button type='submit' disabled={imageFiles.length === 0}>
        Submit
      </button>
    </form>
  );
};

export default ImageGallery;
