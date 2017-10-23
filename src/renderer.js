const fs = require('fs')
const path = require('path')
const { remote, ipcRenderer } = require('electron')
const loader = require('monaco-loader')

const rendererWindow = remote.getCurrentWindow()
let monaco = null
let editor = null

async function openFile(filePath) {
  const extension = path.extname(filePath)
  const filetypes = {
    '.js': 'javascript',
    '.css': 'css'
  }
  const filetype = filetypes[extension] || 'text'

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
 })
