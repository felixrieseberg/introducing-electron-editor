// const app = require('electron').app
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { createMenu } = require('./menu.js')

let mainWindow

app.on('ready', () => {
  console.log('Application is ready!')

  const appUrl = path.join(__dirname, 'index.html')

  mainWindow = new BrowserWindow({
    acceptFirstMouse: true,
    show: false
  })

  mainWindow.loadURL(`file://${appUrl}`)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()

    url = url.slice(process.platform === 'win32' ? 8 : 7)
    mainWindow.webContents.send('open-file', url)

    return false
  })

  createMenu()
})
