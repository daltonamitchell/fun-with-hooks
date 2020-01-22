import React, { Component } from "react";

class Counter extends Component {
  state = { count: 0 };

  setCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.setCount}>Click me</button>
      </div>
    );
  }
}

export default Counter;
