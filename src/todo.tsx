import {createSignal, For} from 'solid-js'

function Todo () {
  const [todos, setTodos] = createSignal<string[]>([])
  const [text, setText] = createSignal<string>('')
  const handleInputChange = (e: Event & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
  }) => {
    setText(e.target.value)
    console.log(e.target.value)
  }
  return (
    <div>
        <h2>Todo list </h2>
        <div>
          <input onChange={handleInputChange} value={text()} onkeypress={e => {
            if (e.key !== 'Enter' || text() === '') return
            setTodos((prev: string) => [...prev, text()])
            setText('')
            } } />
        </div>
        
        <ul>
          <For each={todos()} fallback={<li>Loading...</li>}>
            {(item, i) => <li>{item} <button onClick={() => setTodos((prev: string[]) => [...prev.slice(0, i()), ...prev.slice(i()+1)])}>delte</button> </li>}
          </For>
        </ul>
    </div>
  )
}

export default Todo