const { ipcRenderer } = require('electron')
const loadMonaco = require('monaco-loader')

function sendNotificationFromMain (editor) {
  // We're telling the main process to send the notification
  ipcRenderer.send('send-notification', {
    body: 'Hello from the main process!'
  })

  ipcRenderer.once('clicked-notification', () => {
    editor.setValue('Notification clicked!')
  })
}

loadMonaco().then((monaco) => {
  const element = document.querySelector('#container')
  const options = {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  }

  const editor = monaco.editor.create(element, options)

  // Send a pointless little notification
  editor.addAction({
    id: 'send-notifications',
    label: 'Send notification...',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1,
    precondition: null,
    keybindingContext: null,
    run: (editor) => sendNotificationFromMain(editor)
  })
})
