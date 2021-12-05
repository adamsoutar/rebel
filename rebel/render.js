export default function render (initialEl) {
  // What we rendered last time.
  // This is used for matching up and persisting state across renders
  let prevTree = {}

  function reRender (el, amRoot = false) {
    // Sometimes we get asked to "render" a child that is not a proper component
    if (el == null) return null
    switch (typeof el) {
      case 'string':
      case 'number':
        return el
    }

    const propsWithoutChildren = { ...el.props }
    delete propsWithoutChildren.children

    let result
    switch (typeof el.elem) {
      case 'function': {
        // A functional Rebel component. Let's call its render method
        const renderResult = el.elem(el.props)
        // The renderer (ie. Rebel DOM) doesn't need to care about this wrapper,
        // but we will use it in prevTree for matching state
        result = {
          type: 'rebelComponent',
          renderFn: el.elem,
          props: propsWithoutChildren,
          children: [reRender(renderResult)]
        }
        break
      } case 'string': {
        // A base element like a div or span
        const renderedChildren = el.props.children.map(
          child => reRender(child)
        )

        result = {
          type: 'baseElement',
          baseElement: el.elem,
          props: propsWithoutChildren,
          children: renderedChildren
        }
        break
      } default: {
        throw new Error(`Unimplemented element type "${typeof el.elem}"`)
      }
    }

    if (amRoot) {
      prevTree = result
      console.log('prevTree is now:')
      console.dir(prevTree)
    }

    return result
  }

  return reRender(initialEl, true)
}
