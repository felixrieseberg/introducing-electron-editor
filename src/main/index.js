const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
})
