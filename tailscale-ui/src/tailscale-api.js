// Electron interface
const { ipcMain } = require("electron");

const { exec } = require("child_process");
const { stderr } = require("process");


ipcMain.on("status", (event, args) => {
  console.log("Recieved request");
  exec("tailscale status", (error, stdout, stderr) => {
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



ipcMain.on("connect", (event, args) => {
  console.log("Recieved request");
  exec("sudo tailscale up --accept-routes=true", (error, stdout, stderr) => {
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
  exec("sudo tailscale down", (error, stdout, stderr) => {
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
  exec("tailscale status", (error, stdout, stderr) => {
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