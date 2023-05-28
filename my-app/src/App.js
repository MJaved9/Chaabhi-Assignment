import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
