export default function render (initialEl) {
  // What we rendered last time.
  // This is used for matching up and persisting state across renders
  let prevTree = null

  function reRender (el, prevTreeSoFar, amRoot = false) {
    // console.log(`prevTreeSoFar: ${prevTreeSoFar}`)
    // Sometimes we get asked to "render" a child that is not a proper component
    if (el == null) return null
    switch (typeof el) {
      case 'string':
      case 'number':
        return el
    }

    const propsWithoutChildren = { ...el.props }
    delete propsWithoutChildren.children

    // A very, *very* WIP reconcilliation engine
    // It will attempt to find itself in the previous render tree
    let match = null
    const pTSFC = prevTreeSoFar?.children

    if (amRoot) {
      if (prevTreeSoFar?.renderFn === el.elem) {
        // Matched the root.
        match = prevTreeSoFar
      }
    }

    if (!amRoot && pTSFC) {
      for (let i = 0; i < pTSFC.length; i++) {
        const child = pTSFC[i]
        // Attempting to match a rebelComponent across renders
        if (
          !child.matched &&
          child.type === 'rebelComponent' &&
          child.renderFn === el.elem
        ) {
          // We've found ourselves from last render!
          child.matched = true
          match = child
          break
        }

        // Attempting to match a baseElement across renders
        if (
          !child.matched &&
          child.type === 'baseElement' &&
          child.baseElement === el.elem
        ) {
          child.matched = true
          match = child
          break
        }
      }
    }

    if (match == null) {
      console.log('Match is null, we are a newly mounted component!')
    } else {
      console.log('We were matched up with a component from prevTree, state will persist!')
    }

    let result
    switch (typeof el.elem) {
      case 'function': {
        // A functional Rebel component. Let's call its render method
        // useState etc. will look this up
        const newState = {}
        window.__REBEL_STATE = match ? match.state : newState
        // We make an object that hooks can use to store info in
        // just for this render - this way hooks can talk to each other
        window.__REBEL_PER_RENDER_STATE = {}
        const renderResult = el.elem(el.props)
        // The renderer (ie. Rebel DOM) doesn't need to care about this wrapper,
        // but we will use it in prevTree for matching state
        result = {
          type: 'rebelComponent',
          renderFn: el.elem,
          props: propsWithoutChildren,
          children: [reRender(renderResult, match)],
          state: match ? match.state : newState
        }
        break
      } case 'string': {
        // A base element like a div or span
        const renderedChildren = el.props.children.map(
          child => reRender(child, match)
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

  return [reRender(initialEl, prevTree, true), () => reRender(initialEl, prevTree, true)]
}
