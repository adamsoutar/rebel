export function getHookNumber() {
  const perRen = window.__REBEL_PER_RENDER_STATE

  const hookCount = perRen.hookCount ?? 0
  perRen.hookCount = hookCount + 1

  return hookCount
}

export function getHookStateKey(hookName) {
  return `__REBEL_${hookName}_${getHookNumber()}`
}
