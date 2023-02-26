import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
const electron = window.require("electron");

function App() {
  function callStatus() {
    electron.ipcRenderer.send("status", null);
    alert("Ive been clicked");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Tailscale UI</h1>
        <Button onClick={callStatus} variant="contained"></Button>
      </header>
    </div>
  );
}

export default App;
