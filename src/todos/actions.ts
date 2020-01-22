export const types = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  REMOVE_ALL: "REMOVE_ALL"
};

interface TodoAction {
  type: string;
}

export interface AddTodo extends TodoAction {
  payload: string;
}

export interface UpdateTodo extends TodoAction {
  payload: number;
}

export interface RemoveTodo extends TodoAction {
  payload: number;
}

export interface RemoveAll extends TodoAction {}

export type Action = AddTodo | UpdateTodo | RemoveTodo | RemoveAll;

export const addTodo = (title: string): AddTodo => ({
  type: types.ADD,
  payload: title
});

export const updateTodo = (id: number): UpdateTodo => ({
  type: types.UPDATE,
  payload: id
});

export const removeTodo = (id: number): RemoveTodo => ({
  type: types.REMOVE,
  payload: id
});

export const removeAll = (): RemoveAll => ({
  type: types.REMOVE_ALL
});
