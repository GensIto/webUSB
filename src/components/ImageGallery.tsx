import { useState } from "react";

interface Image {
  src: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const handleFolderSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFolder = event.target.files?.[0];
    if (!selectedFolder) return;

    const files = selectedFolder.webkitRelativePath.split("/");
    const filePromises: Promise<string>[] = [];

    for (const file of files) {
      if (/\.(jpe?g|png|gif)$/i.test(file)) {
        const fileBlob = new File([file], file);
        filePromises.push(
          new Promise((resolve) => resolve(URL.createObjectURL(fileBlob)))
        );
      }
    }

    Promise.all(filePromises).then((urls: string[]) => {
      const imageObjects = urls.map((url: string) => ({ src: url }));
      setImages(imageObjects);
    });
  };

  return (
    <div>
      <input
        type='file'
        onChange={handleFolderSelect}
        webkitdirectory=''
        directory=''
      />
      {images.map((image) => (
        <img key={image.src} src={image.src} />
      ))}
    </div>
  );
};

export default ImageGallery;
