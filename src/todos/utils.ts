import { State } from "./hooks";

export const getNextId = (todos: State) =>
  todos.reduce<number>((highest, t) => (t.id > highest ? t.id : highest), 0) +
  1;
