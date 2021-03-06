const fs = require('fs')
const dotenv = require('dotenv')
const get = require('lodash.get')

module.exports = function compileEnvironment(processEnv, actions) {

  let env = {}
  for (const action of actions) {

    // Env - take values from process.env
    if (action.kind === 'env') {
      Object.assign(env, processEnv)
    }

    // Clear - reset to empty environment
    else if (action.kind === 'clear') {
      env = {}
    }

    // File - load environment from file
    else if (action.kind === 'file') {
      try {
        const fileContent = fs.readFileSync(action.file || '.env', 'utf-8')
        Object.assign(env, dotenv.parse(fileContent))
      }
      catch (err) {
        if (err.code !== 'ENOENT') {
          throw err
        }
      }
    }

    // JSON - load environment from JSON file
    else if (action.kind === 'json') {
      try {
        const fileContent = JSON.parse(fs.readFileSync(action.file || 'package.json', 'utf-8'))
        const fragment = action.fragment ? get(fileContent, action.fragment) : fileContent
        Object.assign(env, fragment)
      }
      catch (err) {
        if (err.code !== 'ENOENT') {
          throw err
        }
      }
    }

    // Set - set variable directly
    else if (action.kind === 'set') {
      env[action.name] = action.value
    }

    else {
      throw new Error(`Unknown action "${action && action.kind}"`)
    }
  }

  return env
}
