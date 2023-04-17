import { useState } from "react";

export const SelectStartDir = () => {
  const [optionValue, setOptionValue] = useState("desktop");
  const optionValues = [
    "desktop",
    "documents",
    "downloads",
    "music",
    "pictures",
    "videos",
  ];
  async function startDesktop() {
    const options = {
      startIn: optionValue,
    };
    await (window as any).showDirectoryPicker(options);
  }
  return (
    <div>
      <select
        value={optionValue}
        onChange={(e) => setOptionValue(e.target.value)}>
        {optionValues.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <button onClick={startDesktop}>{`Start ${optionValue}`}</button>
    </div>
  );
};
