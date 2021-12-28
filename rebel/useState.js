import { getHookStateKey } from './hookInternals.js'

export default function useState(defaultValue) {
  // This component's persisted state object
  const compState = window.__REBEL_STATE

  const stateKey = getHookStateKey('USE_STATE')
  const value = compState[stateKey] ?? defaultValue

  const setValue = rawNewVal => {
    let newVal = rawNewVal
    if (typeof rawNewVal === 'function') {
      newVal = rawNewVal(compState[stateKey] ?? defaultValue)
    }

    compState[stateKey] = newVal
    window.__REBEL_GLOBAL_FIRE_AGAIN()
  }

  return [value, setValue]
}
