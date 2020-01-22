import React from "react";
import "./App.css";

// import Counter from "./counter/HooksCounter";
import Todos from "./todos/HooksTodos";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter></Counter> */}
        <Todos></Todos>
      </header>
    </div>
  );
};

export default App;
