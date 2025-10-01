import { addVote, addAnecdote } from "./reducers/anecdoteReducer.js";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(addAnecdote(content));
  }

  const vote = (id) => {
    dispatch(addVote(id));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <div>
        <form onSubmit={createAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  );
};

export default App;
