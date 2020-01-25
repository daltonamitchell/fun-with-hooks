import React, { useReducer } from "react";

type State = number;

interface Action {
  type: "increment" | "decrement" | "reset";
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

export default () => {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <p>Current count is {count}</p>
      <button data-testid="up" onClick={() => dispatch({ type: "increment" })}>
        Count Up
      </button>
      <button
        data-testid="down"
        onClick={() => dispatch({ type: "decrement" })}
      >
        Count Down
      </button>
      <br />
      <button data-testid="reset" onClick={() => dispatch({ type: "reset" })}>
        Reset Count
      </button>
    </div>
  );
};
