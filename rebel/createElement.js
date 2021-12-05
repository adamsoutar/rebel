export default function createElement (elem, rawProps, ...rawChildren) {
  const props = rawProps ?? {}
  const children = rawChildren.length === 0 && props.children
    ? props.children
    : rawChildren

  return {
    elem,
    props: {
      ...props,
      children
    }
  }
}
