import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import ControlledSwitches from "./switch.js";
import TailscaleStatus from "./status.js";
import React from 'react';



const electron = window.require("electron");

function App() {

  const [connectionStatus, setConnectionStatus] = React.useState({connected:false});
  const [success, setSuccessStatus] = React.useState({connected:"error", label:"Disconnected"})


  function callStatus() {
    electron.ipcRenderer.send("status", null);
    alert("Ive been clicked");
  }

  function callConnect() {
    electron.ipcRenderer.send("connect", null);
    alert("Ive been clicked");
  }

  function callDisconnect() {
    electron.ipcRenderer.send("disconnect", null);
    alert("Ive been clicked");
  }

  function callAttach() {
    electron.ipcRenderer.send("attach", null);
    alert("Ive been clicked");
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1> Tailscale UI</h1>
        <div>
          <ControlledSwitches connected={connectionStatus.connected} indicator={success.connected} label={success.label} />
          <TailscaleStatus  indicator={success.connected} label={success.label}/>

        </div>

        <Button onClick={callStatus} variant="contained">Check Status</Button>
        <Button onClick={callAttach} variant="contained">Attach to Exit Node</Button>
        <Button onClick={callDisconnect} variant="contained">Disconnect</Button>



      </header>
    </div>
  );
}

export default App;
