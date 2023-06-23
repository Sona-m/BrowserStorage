import "./App.css";
import DropdownPage from "./pages/DropdownPage";
import InputForm from "./components/InputForm";
import Card from "./components/Card";

function App() {
  return (
    <div className="App h-screen w-screen bg-[#176B87]">
      <div className="h-20 w-full bg-[#2D4356] text-center text-[#176B87] text-4xl italic pt-4">
        Browser Storage
      </div>
      <div className="h-screen flex flex-row">
        <div className="w-1/5 mr-10">
          <DropdownPage />
        </div>
        <div className="">
          <InputForm />
        </div>
        <Card />
      </div>
    </div>
  );
}

export default App;
