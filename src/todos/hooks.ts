import { useReducer, useCallback, useMemo } from "react";

import {
  Action,
  types,
  AddTodo,
  UpdateTodo,
  RemoveTodo,
  addTodo,
  removeTodo,
  updateTodo,
  removeAll
} from "./actions";

import { getNextId } from "./utils";

export interface TodoState {
  id: number;
  text: string;
  completed: boolean;
}

export type State = TodoState[];

export interface Dispatchers {
  add(text: string): void;
  update(id: number): void;
  remove(id: number): void;
  removeAll(): void;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case types.ADD:
      return [
        ...state,
        {
          id: getNextId(state),
          text: (action as AddTodo).payload,
          completed: false
        }
      ];
    case types.UPDATE:
      return state.reduce((todos: State, todo: TodoState) => {
        return todo.id === (action as UpdateTodo).payload
          ? [...todos, { ...todo, completed: !todo.completed }]
          : [...todos, todo];
      }, []);
    case types.REMOVE:
      return state.reduce((todos: State, todo: TodoState) => {
        return todo.id === (action as RemoveTodo).payload
          ? todos
          : [...todos, todo];
      }, []);
    case types.REMOVE_ALL:
      return state.reduce((todos: State, todo: TodoState) => {
        return todo.completed ? todos : [...todos, todo];
      }, []);
    default:
      return state;
  }
};

export const useTodos = (initialState: State): [State, Dispatchers] => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  const dispatchAdd = useCallback(
    (text: string) => dispatch(addTodo(text)),
    []
  );
  const dispatchUpdate = useCallback(
    (id: number) => dispatch(updateTodo(id)),
    []
  );
  const dispatchRemove = useCallback(
    (id: number) => dispatch(removeTodo(id)),
    []
  );
  const dispatchRemoveAll = useCallback(() => dispatch(removeAll()), []);

  const dispatchers = useMemo(
    () => ({
      add: dispatchAdd,
      update: dispatchUpdate,
      remove: dispatchRemove,
      removeAll: dispatchRemoveAll
    }),
    [dispatchAdd, dispatchUpdate, dispatchRemove, dispatchRemoveAll]
  );

  return [todos, dispatchers];
};
