import { getHookStateKey } from './hookInternals.js'

export default function useEffect(func, deps) {
  const compState = window.__REBEL_STATE

  const stateKey = getHookStateKey('USE_EFFECT')

  const depsLastTime = compState[stateKey]

  if (!deps) {
    // Special case: No dependencies means useEffect runs on
    // every render
    func()
  } else if (deps.length === 0 && depsLastTime == null) {
    // Special case: Empty deps array means run only once
    func()
    compState[stateKey] = []
  } else {
    // Else we need to do a matchup to see if deps are different
    const depsAreDifferent =
      !depsLastTime ||
      depsLastTime.length !== deps.length ||
      !deps.every((obj, i) => obj === depsLastTime[i])
    if (depsAreDifferent) {
      func()
      compState[stateKey] = deps
    }
  }
}
