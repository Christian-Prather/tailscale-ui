// Electron interface
const { ipcMain } = require("electron");

const { exec } = require("child_process");
const { stderr } = require("process");

ipcMain.on("status", (event, args) => {
  console.log("Recieved request");
  exec("tailscale status", (error, stdout, stderr) => {
    if (error) {
      console.log("error: ${error.message}");
      return;
    }
    if (stderr) {
      console.log("stderr: ${stderr}");
      return;
    }
    console.log("stdout", stdout);
  });
});
