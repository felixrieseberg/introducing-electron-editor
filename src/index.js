const { app, BrowserWindow, Menu, dialog } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#1e1e1e'
  })

  //`file://` + __dirname + '/index.html'
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()

    // file:///Users/felixr/... to /Users/felixr/...
    const slices = process.platform === 'win32' ? 8 : 7
    url = url.slice(slices)

    mainWindow.webContents.send('open-file', url)
  })

  // Create a menu template
  const menuTemplate = [
    {
      label: 'Editor',
      submenu: [
        {
          role: 'toggledevtools'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open file',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog(mainWindow, (urls) => {
              if (!urls || urls.length === 0) {
                return
              }

              mainWindow.webContents.send('open-file', urls[0])
            })
          }
        },
        {
          label: 'Save file',
          accelerator: 'CmdOrCtrl+S',
          click() {
            mainWindow.webContents.send('save-file')
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      role: 'windowMenu'
    }
  ]
  const builtMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(builtMenu)
})


