const { autoUpdater } = require('electron')

function setupUpdater() {
  const serverUrl = 'https://my-great-server.com'
  autoUpdater.setFeedURL(serverUrl)

  autoUpdater.on('update-available', () => {
    console.log('An update was found!')
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('Update was downloaded!')

    autoUpdater.quitAndInstall()
  })

  autoUpdater.checkForUpdates()
}

module.exports = { setupUpdater }