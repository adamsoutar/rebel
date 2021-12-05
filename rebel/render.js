// There's no need to fill out the entire tree
// recursively. We can render & match up state as
// we go.

export default function render (el) {
  // Sometimes we get asked to "render" a child that is not a proper component
  if (el == null) return null
  switch (typeof el) {
    case 'string':
    case 'number':
      return el
  }

  switch (typeof el.elem) {
    case 'function': {
      // A functional Rebel component. Let's call its render method
      const result = el.elem(el.props)
      // The renderer (eg. Rebel DOM) doesn't need to know about this
      // component. It only exists to us, so we can just directly
      // pass up its result
      return render(result)
    } case 'string': {
      // A base element like a div or span
      const renderedChildren = el.props.children.map(
        child => render(child)
      )

      const propsWithoutChildren = { ...el.props }
      delete propsWithoutChildren.children

      return {
        type: 'baseElement',
        baseElement: el.elem,
        props: propsWithoutChildren,
        children: renderedChildren
      }
    } default: {
      throw new Error(`Unimplemented element type "${typeof el.elem}"`)
    }
  }
}
