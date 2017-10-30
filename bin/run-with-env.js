#!/usr/bin/env node
const parseCommandLine = require('../lib/parseCommandLine')
const compileEnvironment = require('../lib/compileEnvironment')
const execCommand = require('../lib/execCommand')

const main = () => Promise.resolve().then(() => {
  const { actions, command } = parseCommandLine(process.argv.slice(2))

  const env = compileEnvironment(process.env, actions)

  if (command) {
    return execCommand(command, env).then(({ code }) => code)
  }
  else {
    console.log(JSON.stringify(env, null, 2))
  }
})

main()
  .then((code) => process.exit(code || 0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
