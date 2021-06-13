import "./App.css";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Login />
    </div>
  );
}
export default App;
