// components/AnecdoteList.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from '../services/anecdoteService';

const AnecdoteList = () => {
  const queryClient = useQueryClient();

  // Consulta para obtener las anécdotas
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  // Mutación para actualizar los votos de una anécdota
  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']); // Refresca la lista de anécdotas
    },
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
