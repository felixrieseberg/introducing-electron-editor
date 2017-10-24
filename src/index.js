// const app = require('electron').app
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { createMenu } = require('./menu.js')
const { setupUpdater } = require('./updater.js')

let mainWindow

function getWindowCoordinates() {
  const { screen } = require('electron')
  const screens = screen.getAllDisplays()
  const cursorPosition = screen.getCursorScreenPoint()

  console.log(`We have ${screens.length} screens!`)
  console.log(screens)

  const matchingScreen = screen.getDisplayNearestPoint(cursorPosition)
  console.log(`Mouse cursor is currently on screen:`, matchingScreen)

  return cursorPosition
}

app.on('ready', () => {
  console.log('Application is ready!')

  const appUrl = path.join(__dirname, 'index.html')
  const { x, y } = getWindowCoordinates()

  mainWindow = new BrowserWindow({
    acceptFirstMouse: true,
    show: false,
    x, y
  })

  mainWindow.loadURL(`file://${appUrl}`)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()

    url = url.slice(process.platform === 'win32' ? 8 : 7)
    mainWindow.webContents.send('open-file', url)

    return false
  })

  createMenu()
  // If this was a real app, you could use a real update server
  // setupUpdater()
})

app.on('window-all-closed', () => {
  app.quit()
})
