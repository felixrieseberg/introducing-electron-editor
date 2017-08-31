const { app, BrowserWindow, dialog } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Application ready!')

  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)

  const buttons = ['Yes', 'No']
  const options = {
    type: 'question',
    buttons,
    title: 'Show window?',
    message: 'Do you want to show the window?',
    detail: 'Choose carefully!'
  }

  dialog.showMessageBox(options, (response) => {
    const selected = buttons[response]

    if (selected === 'Yes') {
      mainWindow.show()
    }
  })
})
