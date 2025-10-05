const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  if (action.type === "NEW_ANECDOTE") {
    return state.concat({
      content: action.payload.content,
      id: getId(),
      votes: 0
    });
  } else if (action.type === "ADD_VOTE") {
    const id = action.payload.id;
    const anecdoteToChange = state.find(a => a.id === id);

    return state.map(anecdote =>
      anecdote.id === id ? { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 } : anecdote
    );
  }

  return state;
};

export const addAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: { content }
  };
};

export const addVote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: { id }
  };
};

export default anecdoteReducer;
