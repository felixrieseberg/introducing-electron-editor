const { BrowserWindow } = require('electron')
const path = require('path')

let devDocsWindow

function showDevDocs() {
  const appUrl = 'https://devdocs.io'

  devDocsWindow = devDocsWindow || new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  devDocsWindow.loadURL(appUrl)

  devDocsWindow.on('closed', () => {
    devDocsWindow = null
  })
}

module.exports = { showDevDocs }
