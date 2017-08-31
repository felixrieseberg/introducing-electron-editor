const { app, BrowserWindow, dialog } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800,
    backgroundColor: '#1e1e1e'
  })

  mainWindow.webContents.on('dom-ready', () => {
    // The window has loaded its contents
    mainWindow.show()
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
})
