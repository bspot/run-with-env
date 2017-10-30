
module.exports = function parseCommandLine(argv) {
  const actions = []
  let command = null

  let i = 0
  while (i < argv.length) {
    const arg = argv[i]

    // Everything after "--" is the command to run.
    if (arg === '--') {
      command = argv.slice(i + 1)
      break
    }

    else {
      throw new Error(`Can't parse argument "${arg}"`)
    }

    i += 1
  }

  return { actions, command }
}
