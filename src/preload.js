const fs = require('fs')

window.myAPI = {
  readSourceDirectory() {
    return fs.readdirSync(__dirname)
  }
}
