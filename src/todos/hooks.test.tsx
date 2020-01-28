import { testHook, findById } from "./testUtils";

import { useTodos, reducer, State, Dispatchers } from "./hooks";
import { Action, addTodo, updateTodo, removeTodo, removeAll } from "./actions";

const incomplete = { id: 1, text: "stuff", completed: false };
const complete = { id: 2, text: "thangs", completed: true };
const initialState = [incomplete, complete] as State;

describe("useTodos", () => {
  let todoState: [State, Dispatchers];

  beforeEach(() => {
    testHook(() => {
      todoState = useTodos(initialState);
    });
  });

  it("returns initial state and dispatchers", () => {
    const [state, dispatchers] = todoState;

    expect(state).toEqual(initialState);

    expect(dispatchers).toEqual({
      add: expect.any(Function),
      update: expect.any(Function),
      remove: expect.any(Function),
      removeAll: expect.any(Function)
    });
  });

  it("adds", () => {
    const { add } = todoState[1];
    const todoText = "foo";

    expect(todoState[0]).toHaveLength(initialState.length);

    add(todoText);

    expect(todoState[0]).toHaveLength(initialState.length + 1);
    expect(todoState[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: todoText, completed: false })
      ])
    );
  });

  it("updates completed state", () => {
    const { update } = todoState[1];
    const { id } = incomplete;

    expect(findById(id, todoState[0])).toEqual(
      expect.objectContaining({ completed: false })
    );

    update(id);

    expect(findById(id, todoState[0])).toEqual(
      expect.objectContaining({ completed: true })
    );
  });

  it("removes a single todo", () => {
    const { remove } = todoState[1];
    const { id } = complete;

    expect(findById(id, todoState[0])).toEqual(complete);

    remove(id);

    expect(todoState[0].length).toEqual(initialState.length - 1);
    expect(findById(id, todoState[0])).toBeUndefined();
  });

  it("removes all completed todos", () => {
    const { removeAll } = todoState[1];

    expect(todoState[0]).toEqual(initialState);

    removeAll();

    expect(findById(complete.id, todoState[0])).toBeUndefined();
    expect(findById(incomplete.id, todoState[0])).not.toBeUndefined();
  });
});

describe("reducer", () => {
  let state: State;
  let action: Action;

  beforeEach(() => {
    state = initialState;
  });

  it("ignores unknown actions", () => {
    action = { type: "UNKOWN_ACTION" };

    expect(reducer(state, action)).toEqual(state);
  });

  it("adds todos", () => {
    const text = "all the things";
    action = addTodo(text);

    expect(reducer(state, action)).toEqual([
      ...state,
      { id: 3, completed: false, text }
    ]);
  });

  it("updates a todo", () => {
    action = updateTodo(complete.id);

    expect(reducer(state, action)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: complete.id, completed: false })
      ])
    );
  });

  it("removes a todo", () => {
    action = removeTodo(incomplete.id);

    expect(reducer(state, action)).toEqual([complete]);
  });

  it("removes all todos", () => {
    action = removeAll();

    expect(reducer(state, action)).toEqual([incomplete]);
  });
});
