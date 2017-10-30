
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

    // -j [PATH][#FRAGMENT] / --json [PATH][#FRAGMENT] - load variables from JSON file at PATH
    else if (arg === '-j' || arg === '--json') {
      i += 1
      if (!argv[i]) {
        throw new Error(`${arg} needs a parameter`)
      }
      const idx = argv[i].indexOf('#')
      actions.push({
        kind: 'json',
        file: idx === -1 ? argv[i] : argv[i].slice(0, idx),
        fragment: idx === -1 ? '' : argv[i].slice(idx + 1)
      })
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
