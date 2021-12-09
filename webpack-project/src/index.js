import { render } from 'rebel-dom'

const Greeting = ({ name }) => (
  <em>{name}</em>
)

render(
  <p>Hello, <Greeting name='Adam' />!</p>,
  document.getElementById('root')
)
