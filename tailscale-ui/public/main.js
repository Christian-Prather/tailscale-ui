const { app, BrowserWindow } = require("electron");
const { menubar } = require('menubar');
// const { Menu, Tray, nativeImage } = require('electron');
const path = require('path');
// const isDev = require('electron-is-dev');
// const TrayGenerator = require('../src/TrayGenerator');


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
// function createTray(win) {
//   // const icon = nativeImage.createFromPath('../assets/icon.png')
//   const icon =  path.join(__dirname, '../assets/smiley.png');

//   tray = new Tray(icon);
//   tray.BrowserWindow = win;

//   // const contextMenu = Menu.buildFromTemplate([
//   //   {
//   //     label: 'Quit',
//   //     type: 'normal',
//   //     click() {
//   //       app.quit();
//   //     }
//   //   }
//   // ]);
//   tray.setToolTip('Tailscale UI');
//   tray.setContextMenu(contextMenu);
// }



let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: true,
    fullscreenable: false,
    resizable: true,
    skipTaskbar: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // win.loadURL(
  //   isDev
  //   ? "http://localhost:3000"
  //   : 'index.html'
  //   );

  win.loadURL("http://localhost:3000");

}

app.on("ready", () => {
  createWindow();
  // createTray();
  // const Tray = new TrayGenerator(win);
  // Tray.createTray();
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

// mb.on('after-create-window', () => {
//   mb.window.loadURL("http://localhost:3000");
// });