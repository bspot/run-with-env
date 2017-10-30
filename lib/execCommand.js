const childProcess = require('child_process')

module.exports = function execCommand(command, env) {

  // Prepare command
  let shell
  let commandString
  if (process.platform === 'win32') {
    shell = { command: 'cmd', flag: '/c' }
    commandString = `"${command.join(' ')}"`
  }
  else {
    shell = { command: 'sh', flag: '-c' }
    commandString = `${command.join(' ')}`
  }

  // Spawn child process
  const proc = childProcess.spawn(
    shell.command,
    [shell.flag, commandString],
    {
      env,
      windowsVerbatimArguments: process.platform === 'win32',
      stdio: 'inherit'
    }
  )

  return new Promise((resolve, reject) => {
    proc.on('close', (code) => {
      resolve({ code })
    })
  })
}
