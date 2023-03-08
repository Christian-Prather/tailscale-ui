// Technically in the main process


// Electron interface
const { ipcMain } = require("electron");

const { execSync, exec } = require("child_process");
// const { stderr } = require("process");
var sudo = require('sudo-prompt');
const { stat } = require("fs");
var options = {
  name: 'Electron',
};

ipcMain.on("status", (event, args) => {
  console.log("Recieved request");
  exec("tailscale status --json", (error, stdout, stderr) => {
    if (error) {
      console.log("error:", error.message);
      return;
    }
    if (stderr) {
      console.log("stderr: ${stderr}");
      return;
    }
    var output = JSON.parse(stdout);
    var status = output.Self.Online;
    console.log("Connection Status", status);
    event.reply("connection", status);
  });
  // ipcMain.removeAllListeners("status");
});



ipcMain.on("connect", (event, args) => {
  console.log("Recieved request");
  sudo.exec("tailscale up --accept-routes=true", options, (error, stdout, stderr) => {
    if (error) {
      console.log("error:", error.message);
      return;
    }
    if (stderr) {
      console.log("stderr: ${stderr}");
      return;
    }
    console.log("stdout", stdout);
  });
});


ipcMain.on("disconnect", (event, args) => {
  console.log("Recieved request");
  sudo.exec("tailscale down", options, (error, stdout, stderr) => {
    if (error) {
      console.log("error:", error.message);
      return;
    }
    if (stderr) {
      console.log("stderr: ${stderr}");
      return;
    }
    console.log("stdout", stdout);
  });
});


ipcMain.on("attach", (event, args) => {
  console.log("Recieved request");
  execSync("tailscale status", (error, stdout, stderr) => {
    if (error) {
      console.log("error:", error.message);
      return;
    }
    if (stderr) {
      console.log("stderr: ${stderr}");
      return;
    }
    console.log("stdout", stdout);
  });
});