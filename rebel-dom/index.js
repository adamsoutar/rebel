import { render as rebelRender } from '../rebel/index.js'

function render (el, domTarget) {
  const rebelled = rebelRender(el)

  console.log('Rendering:')
  console.dir(rebelled)
  console.log('To:')
  console.dir(domTarget)
}

export { render }
