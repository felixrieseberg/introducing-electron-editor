const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#1e1e1e'
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
})
