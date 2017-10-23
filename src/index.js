// const app = require('electron').app
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

app.on('ready', () => {
  console.log('Application is ready!')

  const appUrl = path.join(__dirname, 'index.html')

  mainWindow = new BrowserWindow({
    acceptFirstMouse: true,
    show: false
  })
  mainWindow.loadURL(`file://${appUrl}`)
})
