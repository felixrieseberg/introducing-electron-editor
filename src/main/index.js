const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800
  })

  mainWindow.webContents.on('dom-ready', () => {
    // The window has loaded its contents
    mainWindow.show()
    mainWindow.webContents.send('ping-pong', { ping: true })
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)

  ipcMain.on('ping-pong', (event, data) => {
    console.log('Pong received:', data)
  })
})
