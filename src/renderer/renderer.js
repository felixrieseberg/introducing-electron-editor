const fs = require('fs')
const os = require('os')
const loadMonaco = require('monaco-loader')
const { remote } = require('electron')
const { dialog } = remote

let openFilePath = ''

/**
 * This method opens up a dialog and asks the user for a file.
 * It then reads the file and passes returns the contents,
 * separated by newlines.
 *
 * @returns Promise<String>
 */
function askForFileContents() {
  return new Promise((resolve, reject) => {
    const options = {
      filters: [
        { name: 'JavaScript', extensions: ['js', 'jsx'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: [
        'openFile'
      ]
    }

    dialog.showOpenDialog(options, (paths) => {
      const path = paths && paths.length > 0 ? paths[0] : null
      const data = []

      if (path) {
        // Save the file name so that we can re-use it when the
        // file is saved
        openFilePath = path

        // This is primitive, but it shows the idea
        resolve(fs.readFileSync(path, 'utf-8'))
      } else {
        resolve('')
      }
    })
  })
}

loadMonaco().then(async (monaco) => {
  // Ask the user if a file should be opened
  const value = await askForFileContents()

  const element = document.querySelector('#container')
  const options = {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    value
  }

  const editor = monaco.editor.create(element, options)
})
