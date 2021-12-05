import { render as rebelRender } from '../rebel/index.js'

// Takes an element that's already been "rendered"
// by Rebel, and draws it in the DOM
function renderToDOM (rEl, domTarget) {
  if (rEl.type !== 'baseElement') {
    throw new Error(`Unimplemented Rebel DOM type ${rEl.type}`)
  }

  const myDOM = document.createElement(rEl.baseElement)

  for (const child of rEl.children) {
    if (child == null) continue
    switch (typeof child) {
      case 'string':
      case 'number':
        myDOM.append(child)
        break
      default:
        // A sub-component
        renderToDOM(child, myDOM)
    }
  }

  domTarget.append(myDOM)
}

function render (el, domTarget) {
  const rEl = rebelRender(el)

  // Clear out all children from a previous render
  while (domTarget.firstChild) {
    domTarget.removeChild(domTarget.firstChild)
  }

  renderToDOM(rEl, domTarget)
}

export { render }
