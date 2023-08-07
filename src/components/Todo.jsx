export function Todo(props) {
    return (
      <>
        <input
          type="checkbox"
          checked={(console.log("test"), props.todo.completed)}
          onChange={() => {
            setTodos(
              produce((todos) => {
                todos[props.index].completed = !todos[props.index].completed;
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
                todos[props.index].text = e.target.innerText;
              })
            );
          }}
        >
          <Show when={props.todo.completed} fallback={props.children}>
            <s style="pointer-events: none">{props.children}</s>
          </Show>
        </span>
        <button onClick={() => removeTodo(props.index)}>❌</button>
      </>
    );
  }