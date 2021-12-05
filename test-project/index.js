import { createElement } from '../rebel/index.js'
import { render } from '../rebel-dom/index.js'

/*
  <div>You've clicked {count} times</div>
*/
const Message = ({ count }) => {
  return createElement('div', null, "You've clicked ", count, ' times')
}

/*
  <div>
    <Message count={count} />
    <button onPress={() => setPress(count+1)}>Increment</button>
  </div>
*/
const Counter = () => {
  const [count, setCount] = [0, () => {}]

  return createElement(
    'div',
    null,
    createElement(Message, { count }),
    createElement('button', { onPress: () => setCount(count + 1) }, 'Increment')
  )
}

/*
  ReactDOM.render(<Counter />, document.getElementById('root'))
*/
const rootElement = createElement(Counter, null)
render(rootElement, document.getElementById('root'))
