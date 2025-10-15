import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useContext } from "react";
import NotificationContext from "./NotificationContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./requests";

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
          : anecdote
      ));

      notificationDispatch({ type: "SET", payload: `anecdote '${updatedAnecdote.content}' voted` });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    }
  });

  const handleVote = async (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to server issue</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
