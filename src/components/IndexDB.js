import React, { useState, useEffect } from "react";
import { idb } from "../indexedDB";
import { createCollectionsInIndexedDB } from "../indexedDB";

const IndexDB = () => {
  useEffect(() => {
    createCollectionsInIndexedDB();
    handleGet();
  }, []);

  const [allUsersData, setAllUsersData] = useState([]);

  const style = "bg-[#176B87]  text-[#DAFFFB] px-2 py-2 border rounded mb-2";
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbPromise = idb.open("test-db", 1);
    if (name && age && place) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction("dbStore", "readwrite");
        const dbStore = tx.objectStore("dbStore");
        if (addUser) {
          const users = dbStore.put({
            id: allUsersData?.length,
            name,
            age,
            place,
          });
          users.onsuccess = () => {
            tx.oncomplete = () => {
              db.close();
            };
            setAddUser(false);
            handleGet();
            console.log("user added");
            setName("");
            setAge("");
            setPlace("");
          };

          users.onerror = (event) => {
            console.log("error add", event);
          };
        } else {
          const users = dbStore.put({
            id: selectedUser?.id,
            name,
            age,
            place,
          });
          users.onsuccess = (query) => {
            tx.oncomplete = () => {
              db.close();
            };
            console.log("User Updated");
            setName("");
            setAge("");
            setPlace("");
            handleGet();
            setSelectedUser({});
            setEditUser(false);
          };

          users.onerror = (event) => {
            console.log("error update", event);
          };
        }
      };
    }
  };

  const handleGet = () => {
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("dbStore", "readonly");
      const dbStore = tx.objectStore("dbStore");
      const users = dbStore.getAll();
      users.onsuccess = (query) => {
        tx.oncomplete = () => {
          db.close();
        };
        setAllUsersData(query.srcElement.result);
        console.log(allUsersData);
      };

      users.onerror = (event) => {
        console.log("error", event);
      };
    };
  };

  const handleDelete = (user) => {
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("dbStore", "readwrite");
      const dbStore = tx.objectStore("dbStore");
      const deleteduser = dbStore.delete(user.id);
      deleteduser.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        console.log("user deleted");
        handleGet();
      };

      deleteduser.onerror = (event) => {
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
          <div className="w-3/5 text-center text-[#176B87] float-left h-full mr-10 ml-5">
            Results
            <table className="table-auto border-2 border-[#176B87] w-full mr-2 mt-2 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Place</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsersData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.place}</td>
                      <td>
                        <button
                          className={style}
                          onClick={() => {
                            setAddUser(false);
                            setEditUser(true);
                            setSelectedUser(user);
                            setName(user.name);
                            setAge(user.age);
                            setPlace(user.place);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={style}
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mx-auto mr-5">
            <h1 className="text-[#176B87] mb-1">
              To add the user click on ADD button
            </h1>
            <button
              className="bg-[#176B87] rounded border px-3 py-2 text-[#F7FFE5] "
              onClick={() => {
                setAddUser(true);
                setEditUser(false);
                setSelectedUser({});
                setName("");
                setAge("");
                setPlace("");
              }}
            >
              Add
            </button>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-60 justify-center">
                <h1 className="text-[#176B87] mb-3 mr-5 text-center mt-5">
                  {editUser ? "Update" : "Add"} User
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
                <button className={style}>{editUser ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexDB;
