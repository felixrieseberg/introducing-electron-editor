const { ipcRenderer } = require('electron')
const loadMonaco = require('monaco-loader')

loadMonaco().then((monaco) => {
  const element = document.querySelector('#container')
  const options = {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  }

  const editor = monaco.editor.create(element, options)
})

// In the main process: Listen to the ping event
ipcRenderer.on('ping-pong', (event, data) => {
  console.log('Ping received:', data)

  ipcRenderer.send('ping-pong', { pong: true })
})
