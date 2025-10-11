import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data);
};

export const createAnecdote = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then(res => res.data);
};

export const voteAnecdote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  return axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    .then(res => res.data);
};
