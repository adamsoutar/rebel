import { createElement, useState } from '../rebel/index.js'
import { render } from '../rebel-dom/index.js'

const Counter = () => {
  const [count, setCount] = useState(0)

  return createElement(
    'div',
    null,
    count,
    createElement('button', { onClick: () => setCount(count - 1) }, '-'),
    createElement('button', { onClick: () => setCount(count + 1) }, '+')
  )
}

const Main = () => {
  const [show, setShow] = useState(false)

  return createElement(
    'div',
    null,
    createElement(Counter),
    createElement(Counter),
    show ? createElement('div', { style: 'margin: 10' }, 'HELLO!') : null,
    createElement(Counter),
    createElement(Counter),
    createElement('button', { onClick: () => setShow(s => !s) }, 'Add a component in the middle'),
    createElement('div', null, 'Shifts the component tree without loosing state!')
  )
}

/*
  ReactDOM.render(<Counter />, document.getElementById('root'))
*/
const rootElement = createElement(Main, null)
render(rootElement, document.getElementById('root'))
