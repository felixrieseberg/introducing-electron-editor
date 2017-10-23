// const app = require('electron').app
const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application is ready!')

  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})
