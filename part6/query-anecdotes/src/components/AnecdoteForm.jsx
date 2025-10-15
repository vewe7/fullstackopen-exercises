import { useContext } from "react";
import NotificationContext from "../NotificationContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

      notificationDispatch({ type: "SET", payload: `new anecdote created: '${newAnecdote.content}'` });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (err) => {
      if (err.status === 400) {
        notificationDispatch({ type: "SET", payload: `too short anecdote, must have length 5 or more` });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 5000);
      }
    }
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
