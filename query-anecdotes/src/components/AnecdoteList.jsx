import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      showNotification(`Vote updated for: "${updatedAnecdote.content}"`, 'success');
    },
    onError: (error) => {
      console.error('Error updating vote:', error);
      showNotification('Error updating vote.', 'error');
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
