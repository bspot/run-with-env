
module.exports = function compileEnvironment(processEnv, actions) {

  const env = {}
  for (const action of actions) {

    throw new Error(`Unknown action "${action && action.kind}"`)
  }

  return env
}
