const { app, BrowserWindow, Menu } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow()

  //`file://` + __dirname + '/index.html'
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()

    mainWindow.webContents.send('open-file', url)
  })

  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Save file',
          click() {
            mainWindow.webContents.send('save-file')
          }
        }
      ]
    }
  ]
  const builtMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(builtMenu)
})

