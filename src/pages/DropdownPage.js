import React, { useState, useContext } from "react";
import Dropdown from "../components/Dropdown";
import StorageContext from "../context/StorageContext";
function DropdownPage() {
  const [selection, setSelection] = useState(null);
  const { method } = useContext(StorageContext);
  const options = [
    {
      label: "Local Storage",
      value: "localStorage",
    },
    {
      label: "Session Storage",
      value: "sessionStorage",
    },
    {
      label: "Cookies",
      value: "cookies",
    },
  ];

  const handleSelect = (option) => {
    setSelection(option);
    console.log(option);
    method(option.value);
  };
  return (
    <div className="items-start mt-10 ml-7">
      <h1 className=" mb-1 text-[#F7FFE5]">Select Your Storage</h1>
      <Dropdown options={options} onChange={handleSelect} value={selection} />
    </div>
  );
}

export default DropdownPage;
