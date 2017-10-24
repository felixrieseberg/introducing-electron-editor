const { Menu, app, BrowserWindow, dialog } = require('electron')

function createMenu() {
  const template = [
    {
      label: 'Code Editor',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            mainWindow.webContents.send('new-file')
          }
        },
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            dialog.showOpenDialog(mainWindow, {
              defaultPath: __dirname
            }, (urls) => {
              if (urls && urls.length > 0) {
                mainWindow.webContents.send('open-file', urls[0])
              }
            })
          }
        },
        {
          label: 'Save File',
          accelerator: 'CmdOrCtrl+S',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            mainWindow.webContents.send('save-file')
          }
        },
        {
          label: 'Save File as...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            mainWindow.webContents.send('save-file-as')
          }
        },
        {
          label: 'Print',
          accelerator: 'CmdOrCtrl+P',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            mainWindow.webContents.send('print')
          }
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'windowMenu' },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Open Developer Tools',
          accelerator: 'CmdOrCtrl+Alt+I',
          click() {
            BrowserWindow.getAllWindows().forEach((window) => {
              window.webContents.openDevTools()
            })
          }
        }
      ]
    }
  ]

  const builtMenu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(builtMenu)
}

module.exports = { createMenu }
