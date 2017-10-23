const { Menu, app, BrowserWindow } = require('electron')

function createMenu() {
  const template = [
    {
      label: 'Code Editor',
      submenu: [
        {
          label: 'Quit',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'File'
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
