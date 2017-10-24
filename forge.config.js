if (!process.env.CODESIGN_PASSWORD) {
  console.warn('\nWarning!! Codesign password not found\n')
}

module.exports = config = {
  make_targets: {
    win32: [
      'squirrel'
    ],
    darwin: [
      'zip'
    ],
    linux: [
      'deb',
      'rpm'
    ]
  },
  electronPackagerConfig: {
    name: 'Editor',
    icon: './resources/icon',
    osxSign: {
      identity: 'A123567'
    }
  },
  electronWinstallerConfig: {
    name: 'Editor',
    certificateFile: '/path/to/your/certificate.pfx',
    certificatePassword: process.env.CODESIGN_PASSWORD
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: '',
    name: ''
  },
  windowsStoreConfig: {
    packageName: ''
  }
}