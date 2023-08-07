export function Todo(props) {
    return (
      <>
        <input
          type="checkbox"
          checked={(console.log("test"), props.todo.completed)}
          onChange={props.onInputChange}
        />
        <span
          onDblClick={(e) => {
            e.target.setAttribute("contenteditable", true);
            e.target.focus();
          }}
          onBlur={(e) => {
            e.target.setAttribute("contenteditable", false);
            props.onTextChange(e.target.textContent);
          }}
        >
          <Show when={props.todo.completed} fallback={props.children}>
            <s style="pointer-events: none">{props.children}</s>
          </Show>
        </span>
        <button onClick={props.onRemove}>❌</button>
      </>
    );
  }