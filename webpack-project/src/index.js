import { useState, useEffect } from 'rebel'
import { render } from 'rebel-dom'

const Greeting = ({ name }) => <em>{name}</em>

const Counter = () => {
  const [num, setNum] = useState(0)

  useEffect(() => {
    console.log(`Effect: num is now ${num}!`)
  }, [num])

  return (
    <div>
      {num}
      <button onClick={() => setNum(num - 1)}>-</button>
      <button onClick={() => setNum(num + 1)}>+</button>
    </div>
  )
}

render(
  <div>
    <p>
      Hello, <Greeting name='Adam' />!
    </p>
    <Counter />
    <Counter />
  </div>,
  document.getElementById('root')
)
