const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow()

  //`file://` + __dirname + '/index.html'
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})
