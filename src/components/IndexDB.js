import React, { useState, useEffect } from "react";
import { idb } from "../indexedDB";
import { createCollectionsInIndexedDB } from "../indexedDB";

const IndexDB = () => {
  useEffect(() => {
    createCollectionsInIndexedDB();
  });

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    age: "",
    place: "",
  });

  const style = "bg-[#176B87]  text-[#DAFFFB] px-2 py-2 border rounded mb-2";
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    const dbPromise = idb.open("test-db", 1);
    if (name && age && place) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction("dbStore", "readwrite");
        const dbStore = tx.objectStore("dbStore");
        const users = dbStore.put({
          id: 1,
          name,
          age,
          place,
        });
        users.onsuccess = () => {
          tx.oncomplete = () => {
            db.close();
          };
          console.log("user added");
          setName("");
          setAge("");
          setPlace("");
        };

        users.onerror = (event) => {
          console.log("error", event);
        };
      };
    }
  };

  const handleGet = (event) => {
    event.preventDefault();
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("dbStore", "readonly");
      const dbStore = tx.objectStore("dbStore");
      const users = dbStore.get(1);
      users.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        console.log(users.result);
        setUserData(users.result);
        console.log(userData);
      };

      users.onerror = (event) => {
        console.log("error", event);
      };
    };
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("dbStore", "readwrite");
      const dbStore = tx.objectStore("dbStore");
      const users = dbStore.delete(1);
      users.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        console.log("user deleted");
        setUserData({
          id: "",
          name: "",
          age: "",
          place: "",
        });
      };

      users.onerror = (event) => {
        console.log("error", event);
      };
    };
  };
  return (
    <div className="flow-root">
      <div className="w-1/5 bg-[#176B87] float-left text-[#F7FFE5] text-2xl font-bold text-center">
        Index DB
      </div>
      <div className="mr-6 w-9/12 bg-[#DAFFFB] mx-auto float-right h-screen justify-between ">
        <div className="flow-root h-full">
          <div className="w-3/5 text-center text-[#176B87] float-left h-full">
            Results
            <h1 className="mt-5">Name : {userData.name}</h1>
            <p>Age : {userData.age}</p>
            <p>Place : {userData.place}</p>
          </div>
          <div className="mx-auto">
            <form>
              <div className="flex flex-col w-60 justify-center">
                <h1 className="text-[#176B87] mb-3 mr-5 text-center">
                  Enter your details
                </h1>
                <input
                  onChange={(event) => setName(event.target.value)}
                  placeholder="name"
                  name="name"
                  value={name}
                  className="px-2 py-2 border rounded border-gray-200 mb-2"
                  autoComplete="off"
                />
                <input
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="age"
                  name="age"
                  value={age}
                  className="px-2 py-2 border rounded border-gray-200 mb-2"
                  autoComplete="off"
                />
                <input
                  onChange={(event) => setPlace(event.target.value)}
                  placeholder="place"
                  name="place"
                  value={place}
                  className="px-2 py-2 border rounded border-gray-200 mb-4"
                  autoComplete="off"
                />
                <button onClick={handleAdd} className={style}>
                  Add
                </button>
                <button onClick={handleGet} className={style}>
                  Get
                </button>
                <button onClick={handleDelete} className={style}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexDB;
