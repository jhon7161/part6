import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const VoteButton = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: (updatedAnecdote) => updateAnecdote(updatedAnecdote),
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      showNotification(`Vote updated for: "${updatedAnecdote.content}"`, 'success');
    },
    onError: (error) => {
      console.error('Error updating vote:', error);
      showNotification('Error updating vote.', 'error');
    },
  });

  const handleVote = () => {
    mutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <button onClick={handleVote}>
      Vote
      {mutation.isLoading && <p>Updating...</p>}
      {mutation.isError && <p>Error updating votes</p>}
      {mutation.isSuccess && <p>Vote updated successfully!</p>}
    </button>
  );
};

export default VoteButton;
