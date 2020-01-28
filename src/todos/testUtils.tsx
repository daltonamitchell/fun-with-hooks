import React from "react";
import { shallow } from "enzyme";

import { State } from "./hooks";

const TestHook = ({ callback }: any) => {
  callback();
  return null;
};

export const testHook = (callback: any) => {
  shallow(<TestHook callback={callback} />);
};

export const findById = (id: number, todos: State) =>
  todos.find(todo => todo.id === id);
