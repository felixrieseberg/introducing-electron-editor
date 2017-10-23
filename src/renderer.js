const fs = require('fs')
const os = require('os')
const path = require('path')
const { remote, ipcRenderer } = require('electron')
const loader = require('monaco-loader')

const rendererWindow = remote.getCurrentWindow()
let monaco = null
let editor = null
let currentUrl = null

async function openFile(filePath) {
  const extension = path.extname(filePath)
  const filetypes = {
    '.js': 'javascript',
    '.css': 'css'
  }
  const filetype = filetypes[extension] || 'text'

  currentUrl = filePath

  if (monaco && editor) {
    try {
      const filedata = fs.readFileSync(filePath, 'utf-8')
      const model = monaco.editor.createModel(filedata, filetype)

      editor.setModel(model)
    } catch (error) {
      console.log(error)
    }
  }
}

async function saveFile(url) {
  url = url || currentUrl

  const model = editor.getModel()
  let data = ''

  model._lines.forEach((line) => {
    data += line.text + os.EOL
  })

  try {
    fs.writeFileSync(url, data, 'utf-8')
  } catch (error) {
    console.log(error)
  }
}

async function saveFileAs() {
  remote.dialog.showSaveDialog(rendererWindow, {
    defaultPath: __dirname
  }, (url) => saveFile(url))
}

async function newFile() {
  console.log('New file!')
}

loader().then((_monaco) => {
  const div = document.querySelector('#container')

  monaco = _monaco
  editor = monaco.editor.create(div, {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  })

  rendererWindow.show()

  ipcRenderer.on('open-file', (_e, url) => openFile(url))
  ipcRenderer.on('new-file', newFile)
  ipcRenderer.on('save-file', saveFile)
  ipcRenderer.on('save-file-as', saveFileAs)
 })
