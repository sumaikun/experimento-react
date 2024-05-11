import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

const __dirname = path.resolve(path.dirname(''));

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    title: "Your Awesome App",
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  console.log('path',`file://${path.join(__dirname, './build/index.html')}`);

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Dev server ran by React
      : `file://${path.join(__dirname, './build/index.html')}` // Static file for production
  );

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
