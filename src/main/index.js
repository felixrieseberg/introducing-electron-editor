const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')
  mainWindow = new BrowserWindow()
})
