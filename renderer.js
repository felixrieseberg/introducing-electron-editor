const { ipcRenderer } = require('electron')
const fs = require('fs')
const loader = require('monaco-loader')

loader().then((monaco) => {
  const div = document.querySelector('#container')
  let editor = monaco.editor.create(div, {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  })

  ipcRenderer.on('open-file', (sender, url = '') => {
    // file:///Users/felixr/... to /Users/felixr/...
    url = url.slice(7)
    console.log(url)

    const filedata = fs.readFileSync(url, 'utf-8')
    console.log(filedata)

    const model = monaco.editor.createModel(filedata, 'javascript')
    editor.setModel(model)
  })
})
