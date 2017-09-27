const { ipcRenderer, remote } = require('electron')
const fs = require('fs')
const loader = require('monaco-loader')

const { dialog } = remote
const browserWindow = remote.getCurrentWindow()

// This is the file path for the currently open file
let filePath
let changed = false

loader().then((monaco) => {
  const div = document.querySelector('#container')
  let editor = monaco.editor.create(div, {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  })

  function saveFile(saveFilePath) {
    const model = editor.getModel()
    let data = ''

    // Get the text data
    model._lines.forEach((line) => {
      data += line.text + model._EOL;
    });

    fs.writeFileSync(saveFilePath, data, 'utf-8')
  }

  ipcRenderer.on('open-file', (sender, url = '') => {
    console.log(url)
    filePath = url
    changed = false

    const filedata = fs.readFileSync(url, 'utf-8')
    console.log(filedata)

    const model = monaco.editor.createModel(filedata, 'javascript')
    const changeListener = model.onDidChangeContent(() => {
      changed = true
      changeListener.dispose()
    })
    editor.setModel(model)
  })

  ipcRenderer.on('save-file', () => {
    dialog.showMessageBox(browserWindow, {
      type: 'question',
      title: 'Save?',
      message: 'Do you really want to save?',
      buttons: ['Yes', 'No']
    }, (response) => {
      if (response === 0 && !filePath) {
        dialog.showSaveDialog(browserWindow, {}, (userPath) => {
          saveFile(userPath)
        })
      } else if (response === 0) {
        saveFile(filePath)
      } else {
        console.log('Not saving!')
      }
    })
  })
})

