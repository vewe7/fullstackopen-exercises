import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const goodAction = {
    type: "GOOD"
  }

  const okAction = {
    type: "OK"
  }

  const badAction = {
    type: "BAD"
  }

  const resetAction = {
    type: "ZERO"
  }

  test("should return a proper initial state when called with undefined state", () => {
    const state = {}
    const action = {
      type: "DO_NOTHING"
    }

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("state unchanged on undefined action", () => {
    const action = {
      type: "FOO"
    }
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(state);
  });

  test("good is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, goodAction);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test("ok is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, okAction);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  test("bad is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, badAction);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });

  test("expected result from multiple increments", () => {
    const state = initialState;

    deepFreeze(state);
    const firstState = counterReducer(state, goodAction);
    const secondState = counterReducer(firstState, okAction);
    const thirdState = counterReducer(secondState, badAction);

    expect(thirdState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    });
  });

  test("zero correctly resets state", () => {
    const state = {
      good: 20,
      ok: 3,
      bad: 10
    }

    deepFreeze(state);
    const newState = counterReducer(state, resetAction);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    });
  });
})
