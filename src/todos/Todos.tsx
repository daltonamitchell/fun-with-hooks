import React, { Component, RefObject } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
}

class Todos extends Component<{}, State> {
  private input: RefObject<HTMLInputElement> = React.createRef();

  state = {
    todos: [
      { id: 1, text: "stuff", completed: true },
      { id: 2, text: "thangs", completed: true },
      { id: 3, text: "learn hooks", completed: false }
    ]
  };

  onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const { todos } = this.state;
      const nextId =
        todos.reduce<number>(
          (highest, t) => (t.id > highest ? t.id : highest),
          0
        ) + 1;

      this.setState({
        todos: [
          ...todos,
          { id: nextId, text: event.currentTarget.value, completed: false }
        ]
      });

      this.input!.current!.value = "";
    }
  };

  updateTodo = (id: number) => {
    const newTodos = this.state.todos.reduce((todos: Todo[], todo: Todo) => {
      if (todo.id === id) {
        return [...todos, { ...todo, completed: !todo.completed }];
      }

      return [...todos, todo];
    }, []);

    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="What needs to be done?"
          onKeyUp={this.onKeyUp}
          ref={this.input}
        ></input>

        <h4>Stuff to do</h4>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <label
                htmlFor={`todo-${todo.id}`}
                className={todo.completed ? "completed" : ""}
              >
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  defaultChecked={todo.completed}
                  onClick={this.updateTodo.bind(this, todo.id)}
                ></input>{" "}
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todos;
