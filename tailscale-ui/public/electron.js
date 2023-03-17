const { app, BrowserWindow } = require("electron");
const { menubar } = require('menubar');
// const { Menu, Tray } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');


require(path.join(__dirname, "../src/tailscale-api.js"));
require("@electron/remote/main").initialize();

const mb = menubar({
  index: "http://localhost:3000",
  icon: path.join(__dirname, '../assets/smiley.png'),
  tooltip: "Tailscale UI",
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

// let tray;
// function createTray() {
//   const iconPath = path.join(__dirname, 'assets/icon.png');
//   tray = new Tray(iconPath);

//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: 'Quit',
//       type: 'normal',
//       click() {
//         app.quit();
//       }
//     }
//   ]);
//   tray.setToolTip('Tailscale UI');
//   tray.setContextMenu(contextMenu);
// }

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

  win.loadURL(
    isDev
    ? "http://localhost:3000"
    : 'index.html'
    );
}

app.on("ready", () => {
  createWindow();
  // createTray();
});

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