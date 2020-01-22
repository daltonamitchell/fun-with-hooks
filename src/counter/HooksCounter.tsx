import React, { useReducer, useCallback } from "react";

const reducer = (state: number, action: string) => {
  switch (action) {
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
  const countUp = useCallback(() => dispatch("increment"), []);

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={() => dispatch("increment")}>Up</button>
      <button onClick={() => dispatch("decrement")}>Down</button>
      <br />
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
};
