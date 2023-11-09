import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import './App.css'
import Todo from './todo'
import PingPongGame from './PingPongGame'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="App">
      <PingPongGame />
    </div>
  )
}

export default App
