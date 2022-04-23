const { app, BrowserWindow, ipcMain, Menu, Tray, Notification } = require('electron');
const path = require('path');
const keytar = require("keytar");
require('@electron/remote/main').initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

if (process.platform === 'win32')
{
    app.setAppUserModelId(app.name);
}

let currentWindow;
let mainWindow;
const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })
}

const createLoadingWindow = () => {
  const loadingWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    titleBarStyle: 'hidden', 
    autoHideMenuBar: true,
    show: false,
    icon: path.join(__dirname, 'assets/pricetrackerlogo.ico'),
    webPreferences: {
      preload: path.join(__dirname, '/preload.js')
  }
  });

  currentWindow = loadingWindow;

  windowSetup(loadingWindow, 'Loading/loading.html');
};

const createLoginWindow = () => {
  const loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 450,  
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets/pricetrackerlogo.ico'),
    webPreferences: {
      preload: path.join(__dirname, '/preload.js')
  }
  });

  currentWindow = loginWindow;

  windowSetup(loginWindow, 'Login/login.html');
  
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 400,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets/pricetrackerlogo.ico'),
    webPreferences: {
      //nodeIntegration: true,
      //contextIsolation: false,
      preload: path.join(__dirname, '/preload.js')
  }
  });

  currentWindow = mainWindow;

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
  
  mainWindow.on('close', function(event) {
    if (!app.isQuitting) { 
      event.preventDefault();
      mainWindow.hide();
    }
    app.isQuitting = false;
    return false;
  })


  windowSetup(mainWindow, 'Index/index.html');
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

//app.on('ready', createLoadingWindow);
app.whenReady().then(() => {
  createLoadingWindow();
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        if (currentWindow)
            currentWindow.show();
    } },
    { label: 'Quit', click:  function(){
        app.isQuitting = true;
        app.quit();
    } }
  ]);
  tray = new Tray(__dirname + '/assets/pricetrackerlogo.ico')
  tray.setToolTip("Steam Price Tracker")
  tray.setContextMenu(contextMenu)

  tray.on('double-click', function() {
    if (currentWindow)
      currentWindow.show();
  })
})

app.on('before-quit', function () {
  app.isQuiting = true;
});

ipcMain.on('open-index', function() {
  createMainWindow();
});
ipcMain.on('open-login', function() {  
  if (mainWindow) {
    app.isQuitting = true;
    mainWindow.close();
  }
  createLoginWindow();
});

ipcMain.on('show-window', () => {
  if (currentWindow)
    currentWindow.show();
})

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