import {createSignal, For} from 'solid-js'

function Todo () {
  const [todos, setTodos] = createSignal<string[]>([])
  const [text, setText] = createSignal<string>('')
  return (
    <div>
        <h2>Todo list </h2>
        <div>
          <input onChange={e => setText(e.target.value)} value={text()} onKeyDown={e => {
            if (e.key !== 'Enter' || text() === '') return
            setTodos((prev) => [...prev, text()] )
            setText('')
            } } />
        </div>
        
        <ul>
          <For each={todos()} fallback={<li>Loading...</li>}>
            {(item, i) => <li>{item} <button onClick={() => setTodos(prev => [...prev.slice(0, i()), ...prev.slice(i()+1)])}>delte</button> </li>}
          </For>
        </ul>
    </div>
  )
}

export default Todo