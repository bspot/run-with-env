
module.exports = function parseCommandLine(argv) {
  const actions = [{ kind: 'env' }]
  let command = null

  let i = 0
  while (i < argv.length) {
    const arg = argv[i]

    // Everything after "--" is the command to run.
    if (arg === '--') {
      command = argv.slice(i + 1)
      break
    }

    // -e / --env - use current process.env
    else if (arg === '-e' || arg === '--env') {
      actions.push({ kind: 'env' })
    }

    // -c / --clear - reset environment
    else if (arg === '-c' || arg === '--clear') {
      actions.push({ kind: 'clear' })
    }

    // -f PATH / --file PATH - load variables from PATH
    else if (arg === '-f' || arg === '--file') {
      i += 1
      actions.push({ kind: 'file', file: argv[i] })
    }

    // -d / --dotenv - load variables from default .env file
    else if (arg === '-d' || arg === '--dotenv') {
      actions.push({ kind: 'file' })
    }

    // NAME=value - set variable
    else {
      const idx = arg.indexOf('=')
      if (idx !== -1) {
        actions.push({ kind: 'set', name: arg.slice(0, idx), value: arg.slice(idx + 1) })
      }
      else {
        throw new Error(`Can't parse argument "${arg}"`)
      }
    }

    i += 1
  }

  return { actions, command }
}
