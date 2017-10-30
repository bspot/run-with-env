
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

    else {
      throw new Error(`Can't parse argument "${arg}"`)
    }

    i += 1
  }

  return { actions, command }
}
