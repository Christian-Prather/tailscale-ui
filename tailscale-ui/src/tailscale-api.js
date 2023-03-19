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

    var peers = output.Peer;
    // console.log("PEERS", peers);
    var exitNodes = [];

    for (var i in peers) {
      var peer = peers[i];
      // console.log("Peer", peer);
      if (peer.ExitNodeOption) {
        console.log("Found exit node options", peer.TailscaleIPs[0])
        exitNodes.push(peer.TailscaleIPs[0]);

      }
    }
    event.reply("exit-nodes", exitNodes);

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
  console.log("Recieved request", args);
  var command = "tailscale up --accept-routes=true --exit-node=" + args;
  console.log("COMMAND", command);
  sudo.exec(command, options, (error, stdout, stderr) => {
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