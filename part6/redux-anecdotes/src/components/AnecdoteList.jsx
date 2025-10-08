import { createVote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(createVote(anecdote));
    dispatch(createNotification(`new anecdote '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;
