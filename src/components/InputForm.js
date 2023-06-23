import React, { useState, useContext } from "react";
import StorageContext from "../context/StorageContext";

const InputForm = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const { methodName, handleData, handleDelete } = useContext(StorageContext);
  const style =
    "bg-[#176B87] rounded border-[#176B87] py-2 px-4 text-[#F7FFE5] mb-2";

  let formData = {
    name: name,
    age: age,
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (methodName === "localStorage") {
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log(formData);
    } else if (methodName === "sessionStorage") {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      console.log(formData);
    } else if (methodName === "cookies") {
      const formDataString = JSON.stringify(formData);
      document.cookie = `formData=${encodeURIComponent(
        formDataString
      )}; expires=Thu, 1 Jan 2026 12:00:00 UTC; path=/`;

      console.log(formData);
    }
    setName("");
    setAge("");
  };

  const handleGetClick = (e) => {
    e.preventDefault();
    if (methodName === "localStorage") {
      formData = JSON.parse(localStorage.getItem("formData"));
      console.log(formData);
      handleData(formData);
    } else if (methodName === "sessionStorage") {
      formData = JSON.parse(sessionStorage.getItem("formData"));
      console.log(formData);
      handleData(formData);
    } else if (methodName === "cookies") {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("formData"))
        .split("=")[1];
      formData = JSON.parse(decodeURIComponent(cookieValue));
      console.log(formData);
      handleData(formData);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (methodName === "localStorage") {
      localStorage.removeItem("formData");
      handleDelete(formData);
    } else if (methodName === "sessionStorage") {
      sessionStorage.removeItem("formData");
      handleDelete(formData);
    } else if (methodName === "cookies") {
      document.cookie =
        "formData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      handleDelete(formData);
      console.log("cookies delete");
    }
  };

  return (
    <div className=" bg-[#DAFFFB] h-full py-10">
      <form>
        <h1 className="text-center text-[#176B87]">Enter Your Details</h1>
        <div className="flex flex-col px-10 py-6  ">
          <input
            onChange={(e) => setName(e.target.value)}
            name="Name"
            placeholder="Name"
            className="rounded border  py-2 px-3 text-[#176B87] mb-2 "
            autoComplete="off"
            value={name}
          />
          <input
            onChange={(e) => setAge(e.target.value)}
            name="Age"
            placeholder="age"
            className="rounded border py-2 px-3 text-[#176B87] mb-4 "
            autoComplete="off"
            value={age}
          />
          <button onClick={handleAddClick} className={style}>
            Add
          </button>
          <button onClick={handleGetClick} className={style}>
            Get
          </button>
          <button onClick={handleDeleteClick} className={style}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
