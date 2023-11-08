import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import './App.css'
import Todo from './todo'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="App">
      <Todo />
    </div>
  )
}

export default App
