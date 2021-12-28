export default function useState(defaultValue) {
  // This component's persisted state object
  const compState = window.__REBEL_STATE
  const perRen = window.__REBEL_PER_RENDER_STATE

  console.log(`useState says compState is: ${JSON.stringify(compState)}`)

  const hookCount = perRen.hookCount ?? 0
  perRen.hookCount = perRen.hookCount != null ? perRen.hookCount + 1 : 1

  const stateKey = `__REBEL_USE_STATE_${hookCount}`
  console.log(`state key is ${stateKey}`)
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
