// components/VoteButton.js
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../services/anecdoteService';

const VoteButton = ({ anecdote }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedAnecdote) => updateAnecdote(updatedAnecdote),
    onSuccess: () => {
      // Invalida y refetch las anécdotas cuando una anécdota es actualizada
      queryClient.invalidateQueries(['anecdotes']);
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
