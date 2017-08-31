const loadMonaco = require('monaco-loader')
const { remote } = require('electron')
const { Menu, app } = remote

loadMonaco().then((monaco) => {
  const element = document.querySelector('#container')
  const options = {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    // We'll make our own
    contextmenu: false
  }

  const editor = monaco.editor.create(element, options)

  // Context menu
  const template = [
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    {
      label: 'Minimize Window',
      click (item, browserWindow, event) {
        browserWindow.minimize()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click () {
        app.quit()
      }
    }
  ]

  const menu = Menu.buildFromTemplate(template)

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
  }, false)
})
