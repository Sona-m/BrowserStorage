import { createContext, useState } from "react";

const StorageContext = createContext();

function Provider({ children }) {
  const [methodName, setMethodName] = useState();
  const [data, setData] = useState({
    name: "",
    age: "",
  });
  const method = (selection) => {
    setMethodName(selection);
    console.log(selection);
  };

  const handleData = (getData) => {
    setData({
      name: getData.name,
      age: getData.age,
    });
  };

  const handleDelete = (getData) => {
    setData({
      name: "",
      age: "",
    });
  };
  return (
    <StorageContext.Provider
      value={{ method, methodName, data, handleData, handleDelete }}
    >
      {children}
    </StorageContext.Provider>
  );
}
export { Provider };
export default StorageContext;
