import { useState } from "react";
import "./App.css";
import { SelectStartDir } from "./components/SelectStartDir";
import { RequestUSB } from "./components/RequestUSB";
import { GetUSB } from "./components/GetUSB";
import { AccessUSBDevice } from "./components/AccessUSBDevice";
import { SelectFile } from "./components/SelectFile";
import { SelectDirectory } from "./components/SelectDirectory";
import { PushIndexedDB } from "./components/PushIndexedDB";

const App: React.FC = () => {
  return (
    <div>
      <RequestUSB />
      <GetUSB />
      <AccessUSBDevice />
      <SelectFile />
      <SelectStartDir />
      <SelectDirectory />
      <PushIndexedDB />
    </div>
  );
};

export default App;
