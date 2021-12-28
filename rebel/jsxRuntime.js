// Babel does "import { jsx } from 'rebel/jsx-runtime'"
// Our JSX function is just a wrapper for createElement
import createElement from './createElement.js'

export const jsx = (elem, { children, ...props }) =>
  createElement(elem, props, children)

export const jsxs = (elem, { children, ...props }) =>
  createElement(elem, props, ...children)
