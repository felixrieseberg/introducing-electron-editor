const loadMonaco = require('monaco-loader')

function sendNotification (editor) {
  const notification = new window.Notification('Hello!', {
    body: 'Hello from your notification system'
  })

  notification.onclick = () => {
    editor.setValue('Notification clicked!')
  }
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
    run: (editor) => sendNotification(editor)
  })
})
