import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload);
      return state.map(anecdote =>
        (anecdote.id === action.payload)
          ? { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
          : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  }
};

export default anecdoteSlice.reducer;
