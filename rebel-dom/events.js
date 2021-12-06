// Event names that are valid in Rebel props
const eventNames = [
  'onClick', 'onMouseDown', 'onMouseUp', 'onMouseMove',
  'onKeyDown', 'onKeyUp', 'onKeyPress'
]

function rebelPropToDOMEvent (eventName) {
  const withoutOn = eventName.slice(2)
  const camelCase = withoutOn[0].toLowerCase() + withoutOn.slice(1)
  return camelCase
}

export function addEventIfNecessary (propName, value, domTarget) {
  console.log(`Asked to add ${propName}`)
  if (!eventNames.includes(propName)) return
  console.log("That's a valid name")

  const domName = rebelPropToDOMEvent(propName)
  console.log(`Adding ${domName}`)
  domTarget.addEventListener(domName, value)
}
