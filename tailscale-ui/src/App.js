import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import ControlledSwitches from "./switch.js";
import TailscaleStatus from "./status.js";
import React from 'react';



const electron = window.require("electron");

function App() {

  const [connectionTracker, setConnectionStatus] = React.useState({ isConnected: false, label: "Disconnected" })
  const [connectionIndicator, setIndicator] = React.useState({ type: "error" })

  function updateConnectionTracker(isConnected, label) {
    setConnectionStatus({ isConnected: isConnected, label: label });
    // This is used to set the status button type "error" is the red button and "success" is a green button
    if (isConnected) {
      setIndicator({ type: "success" });
    }
    else {
      setIndicator({ type: "error" });
    }
    console.log("Update callback called", isConnected, label);

  }

  function callStatus() {
    electron.ipcRenderer.send("status", null);
    // alert("Ive been clicked");
  }

  function callConnect() {
    electron.ipcRenderer.send("connect", null);
    // alert("Ive been clicked");
  }

  function callDisconnect() {
    electron.ipcRenderer.send("disconnect", null);
    // alert("Ive been clicked");
  }

  function callAttach() {
    electron.ipcRenderer.send("attach", null);
    // alert("Ive been clicked");
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1> Tailscale UI</h1>
        <div>
          <ControlledSwitches callback={updateConnectionTracker} />
          <TailscaleStatus indicator={connectionIndicator.type} label={connectionTracker.label} />

        </div>
        
        <Button onClick={callStatus} variant="contained">Check Status</Button>
        <Button onClick={callAttach} variant="contained">Attach to Exit Node</Button>
        {/* <Button onClick={callDisconnect} variant="contained">Disconnect</Button> */}



      </header>
    </div>
  );
}

export default App;
