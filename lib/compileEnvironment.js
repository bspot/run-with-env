
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

    else {
      throw new Error(`Unknown action "${action && action.kind}"`)
    }
  }

  return env
}
