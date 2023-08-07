import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";

function App() {
  const [darkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  const [todos, setTodos] = createStore([
    { text: "Abrazar un pinguino", completed: true },
    { text: "Saludar pinguino", completed: false },
    { text: "Tomarle foto a un pinguino", completed: false },
  ]);

  const [newItem, setNewItem] = createSignal("");

  function addTodo() {
    if (newItem()) {
      setTodos(
        produce((todos) => todos.push({ text: newItem(), completed: false }))
      );
      setNewItem("");
    }
  }

  function removeTodo(index) {
    setTodos(produce((todos) => todos.splice(index, 1)));
  }

  const completedCount = createMemo(
    () => todos.filter((todo) => todo.completed).length
  );

  return (
    <div class="w-full h-full min-h-screen flex items-center justify-center dark:bg-gray-600 dark:text-white">
      <button
        class="text-2xl fixed top-0 right-0"
        onClick={() => toggleDarkMode()}
      >
        {darkMode() ? "�" : "�"}
      </button>

      <div>
        <h1 class="text-2xl text-center">Solid Todo App</h1>
        <input
          class="border dark:text-black"
          type="text"
          value={newItem()}
          onInput={(e) => setNewItem(e.target.value)}
        />
        <button class="px-2 border" onClick={addTodo}>
          Add
        </button>
        <ul>
          <For each={todos} fallback={"No hay elementos"}>
            {(todo, index) => (
              <li>
                <input
                  type="checkbox"
                  checked={(console.log("test"), todo.completed)}
                  onChange={() => {
                    setTodos(
                      produce((todos) => {
                        todos[index()].completed = !todos[index()].completed;
                      })
                    );
                  }}
                />
                <span
                  onDblClick={(e) => {
                    e.target.setAttribute("contenteditable", true);
                    e.target.focus();
                  }}
                  onBlur={(e) => {
                    e.target.setAttribute("contenteditable", false);
                    setTodos(
                      produce((todos) => {
                        todos[index()].text = e.target.innerText;
                      })
                    );
                  }}
                >
                  <Show when={todo.completed} fallback={todo.text}>
                    <s style="pointer-events: none">{todo.text}</s>
                  </Show>
                </span>
                <button onClick={() => removeTodo(index())}>❌</button>
              </li>
            )}
          </For>
        </ul>
        <p class="text-sm mt-4">
          Completed count: {(console.log("completed"), completedCount())}
        </p>
      </div>
    </div>
  );
}

export default App;