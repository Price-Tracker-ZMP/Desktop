const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const keytar = require("keytar");
require('@electron/remote/main').initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createLoginWindow = () => {
  const loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'js/preload.js')
  }
  });
  windowSetup(loginWindow, 'html/login.html');
  
};

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'js/preload.js')
  }
  });
  windowSetup(mainWindow, 'html/index.html');
  
};

const windowSetup = (window, page) => {
  require('@electron/remote/main').enable(window.webContents);

  // Load the page
  window.loadFile(path.join(__dirname, page));

  // Open the DevTools.
  window.webContents.openDevTools();
}


global.isAuthenticated = false;
keytar.getPassword("PriceTracker", "userToken").then(result => {
  if (result != undefined)
    global.isAuthenticated = true;
});

ipcMain.on('set-authenticated', (event, state) => {
  global.isAuthenticated = state;
});

app.on('ready', createLoginWindow);

ipcMain.on('open-index', createMainWindow);
ipcMain.on('open-login', createLoginWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});