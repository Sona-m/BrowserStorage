import React, { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();
  useEffect(() => {
    // to handle the click outside the dropdown
    const handleBodyClick = (event) => {
      if (!divRef.current) {
        return;
      }
      if (!divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleBodyClick, true); //capture phase (parent to child) body-div-dropdown
    return () => {
      // cleanup function
      document.removeEventListener("click", handleBodyClick);
    };
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divRef} className="w-64 relative">
      <div
        className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-[#F7FFE5] text-[#176B87] w-full"
        onClick={handleClick}
      >
        {value?.label || "Select..."}
        <GoChevronDown className="text-lg" />
      </div>
      {isOpen && (
        <div className="absolute top-full border rounded p-3 shadow w-full bg-[#F7FFE5] text-[#176B87]">
          {renderedOptions}
        </div>
      )}
    </div>
  );
};

export default Dropdown;