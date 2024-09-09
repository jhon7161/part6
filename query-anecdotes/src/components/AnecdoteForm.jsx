import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { createAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const { showNotification } = useNotification();
  const mutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      showNotification(`Error adding anecdote: ${error.message}`, 'error');
      // Limpiar el input en caso de error
      clearInput();
    },
    onSuccess: (data) => {
      showNotification(`Anecdote added successfully: "${data.content}"`, 'success');
      // Limpiar el input en caso de éxito
      clearInput();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.elements.content.value;

    if (content.length < 5) {
      showNotification('Anecdote must be at least 5 characters long.', 'error');
      // Limpiar el input en caso de error
      clearInput();
      return;
    }

    mutation.mutate({ content, votes: 0 });
  };

  const clearInput = () => {
    // Limpiar el input después de la sumisión
    document.querySelector('input[name="content"]').value = '';
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="content"
            placeholder="Write your anecdote here..."
          />
        </div>
        <button type="submit">Add Anecdote</button>
        {mutation.isLoading && <p>Adding anecdote...</p>}
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>Anecdote added: {mutation.data.content}</p>}
      </form>
    </div>
  );
};

export default AnecdoteForm;
