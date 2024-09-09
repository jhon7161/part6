import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          message: `Vote updated for: "${updatedAnecdote.content}"`,
          type: 'success', // Éxito
        },
      });
      setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION });
      }, 5000);
    },
    onError: (error) => {
      console.error('Error updating vote:', error);
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          message: 'Error updating vote.',
          type: 'error', // Error
        },
      });
      setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION });
      }, 5000);
    }
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isLoading) return <p>Loading anecdotes...</p>;
  if (isError) return <p>Anecdote service not available due to problems with the server</p>;

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>has {anecdote.votes} votes</p>
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
