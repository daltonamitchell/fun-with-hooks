import React, { useRef, KeyboardEvent } from "react";

import Todo from "./Todo";

import { useTodos, State } from "./hooks";
import Context from "./Context";

const initialState: State = [
  { id: 1, text: "stuff", completed: true },
  { id: 2, text: "thangs", completed: true },
  { id: 3, text: "learn hooks", completed: false }
];

export default () => {
  const [todos, dispatchers] = useTodos(initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      dispatchers.add(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const removeAll = () => !!dispatchers && dispatchers.removeAll();

  const header = todos.length ? `${todos.length} todos` : "Add some todos";
  const removeAllButton = todos.length ? (
    <button className="removeAll" onClick={removeAll}>
      Clear all complete 🪓{" "}
    </button>
  ) : null;

  return (
    <Context.Provider value={dispatchers}>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What needs to be done?"
            ref={inputRef}
          ></input>
        </form>

        <h4>{header}</h4>
        {removeAllButton}

        <ul>
          {todos.map(todo => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </ul>
      </div>
    </Context.Provider>
  );
};
