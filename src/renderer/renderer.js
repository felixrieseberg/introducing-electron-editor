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

/**
 * Saves the contents of the editor to a file
 *
 * @param {Monaco.editor} editor
 * @returns Promise<void>
 */
function saveFileContents(editor) {
  return new Promise((resolve) => {
    const model = editor.getModel()
    const options = {
      defaultPath: openFilePath
    }

    let data = '';

    model._lines.forEach((line) => {
      data += line.text + model._EOL;
    });

    dialog.showSaveDialog(options, (filePath) => {
      if (filePath) {
        fs.writeFileSync(filePath, data, 'utf-8')
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

  // Add a "save action" to the context menu
  editor.addAction({
    id: 'save-file',
    label: 'Save file...',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1,
    precondition: null,
    keybindingContext: null,
    run: (editor) => saveFileContents(editor)
  })
})
