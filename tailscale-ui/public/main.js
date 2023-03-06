const { app, BrowserWindow } = require("electron");
const { menubar } = require('menubar');


require("../src/tailscale-api.js")
require("@electron/remote/main").initialize();

const mb = menubar({
  index: "http://localhost:3000",
  browserWindow: {
    width: 250,
    height: 250,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  }
}
);

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
});