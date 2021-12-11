export default function isSameComponent (comp1, comp2) {
  return (
    comp1?.renderFn === comp2.elem ||
    comp1?.baseElement === comp2.elem
  )
}
