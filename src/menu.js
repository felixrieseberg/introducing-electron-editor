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
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            const mainWindow = BrowserWindow.getFocusedWindow()
            dialog.showOpenDialog(mainWindow, (urls) => {
              if (urls.length > 0) {
                mainWindow.webContents.send('open-file', urls[0])
              }
            })
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
