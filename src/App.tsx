import { ChangeEvent, useState } from "react";
import "./App.css";
import { SelectStartDir } from "./components/SelectStartDir";
import { RequestUSB } from "./components/RequestUSB";
import { GetUSB } from "./components/GetUSB";
import { AccessUSBDevice } from "./components/AccessUSBDevice";
import { SelectFile } from "./components/SelectFile";
import { SelectDirectory } from "./components/SelectDirectory";
import { PushIndexedDB } from "./components/PushIndexedDB";
import { Divider } from "./components/Divider";
import ImageGallery from "./components/ImageGallery";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: boolean | string;
    webkitdirectory?: boolean | string;
  }
}

const App: React.FC = () => {
  return (
    <div>
      <RequestUSB />
      <Divider />
      {/*  */}
      <GetUSB />
      <Divider />
      {/*  */}
      <AccessUSBDevice />
      <Divider />
      {/*  */}
      <SelectFile />
      <Divider />
      {/*  */}
      <SelectStartDir />
      <Divider />
      {/*  */}
      <SelectDirectory />
      <Divider />
      {/*  */}
      <PushIndexedDB />
      <Divider />
      {/*  */}
      <ImageGallery />
      <Divider />
    </div>
  );
};

export default App;
