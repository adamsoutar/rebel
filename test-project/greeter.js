import { createElement } from '../rebel/index.js'
import { render } from '../rebel-dom/index.js'

/*
  <span>Hello, {name}!</span>
*/
const Greeter = ({ name }) => {
  return createElement('span', null, 'Hello, ', name, '!')
}

/*
  <div style='height: 100%'><Greeter name='Adam' /></div>
*/
const TestElem = () => {
  const name = 'Adam'

  return createElement(
    'div',
    { style: 'color: orange' },
    createElement(Greeter, { name })
  )
}

const rootElement = createElement(TestElem, null)

render(rootElement, document.getElementById('root'))
