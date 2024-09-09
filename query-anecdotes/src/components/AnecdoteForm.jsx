// components/AnecdoteForm.jsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../services/anecdoteService';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  // Mutación para añadir una nueva anécdota
  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      // Invalidamos la cache para refrescar las anécdotas
      queryClient.invalidateQueries(['anecdotes']);
    },
    onError: (error) => {
      console.error('Error adding anecdote:', error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long.');
      return;
    }

    // Enviar la anécdota con votos iniciales de 0
    mutation.mutate({ content, votes: 0 });
    setContent(''); // Limpiamos el campo de entrada después de agregar
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your anecdote here..."
          />
        </div>
        <button type="submit">Add Anecdote</button>
        {mutation.isLoading && <p>Adding anecdote...</p>}
        {mutation.isSuccess && <p>Anecdote added successfully!</p>}
      </form>
    </div>
  );
};

export default AnecdoteForm;
