import { inspect } from 'util'
import { createElement, render } from 'rebel'

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
  let name = 'Adam'

  return createElement(
    'div',
    { style: 'height: 100%' },
    createElement(Greeter, { name: 'Adam' })
  )
}

const rootElement = createElement(TestElem, null)

console.log(
  // Infinite depth console.dir
  inspect(
    render(rootElement),
    false, null, true
  )
)
