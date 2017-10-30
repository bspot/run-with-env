
module.exports = function compileEnvironment(processEnv, actions) {

  const env = {}
  for (const action of actions) {

    // Env - take values from process.env
    if (action.kind === 'env') {
      Object.assign(env, processEnv)
    }

    else {
      throw new Error(`Unknown action "${action && action.kind}"`)
    }
  }

  return env
}
