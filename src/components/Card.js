import React, { useContext } from "react";
import StorageContext from "../context/StorageContext";

const Card = () => {
  const { data } = useContext(StorageContext);
  return (
    <div className="overflow-hidden bg-[#DAFFFB]  h-full w-3/4 ">
      <div className="px-6 py-4">
        <div className=" text-center text-[#176B87] mb-2 mt-5">Results</div>
        <p className="text-[#176B87] text-base text-2xl text-center">{data.name}</p>
        <p className="text-[#176B87] text-base text-2xl text-center">{data.age}</p>
      </div>
    </div>
  );
};

export default Card;
