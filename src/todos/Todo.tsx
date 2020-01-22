import React, { useContext } from "react";

import { TodoState } from "./hooks";

import Context from "./Context";

const Todo = ({ id, completed, text }: TodoState) => {
  const dispatchers = useContext(Context);
  const updateTodo = () => !!dispatchers && dispatchers.update(id);
  const removeTodo = () => !!dispatchers && dispatchers.remove(id);

  const removeButton = completed ? (
    <button onClick={removeTodo} className="removeTodo">
      🪓
    </button>
  ) : null;

  return (
    <li>
      <label htmlFor={`todo-${id}`} className={completed ? "completed" : ""}>
        <input
          type="checkbox"
          id={`todo-${id}`}
          defaultChecked={completed}
          onClick={updateTodo}
        ></input>{" "}
        {text}
      </label>
      {removeButton}
    </li>
  );
};

export default Todo;
