const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800,
    webPreferences: {
      preload: require.resolve('../renderer/preload.js'),
      nodeIntegration: false
    }
  })

  mainWindow.webContents.on('dom-ready', () => {
    // The window has loaded its contents
    mainWindow.show()
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
})
