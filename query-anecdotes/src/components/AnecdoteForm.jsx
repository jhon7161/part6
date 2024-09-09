import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { createAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const { dispatch } = useNotification();
  
  // Configuración de useMutation con callbacks
  const mutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      // Manejo de error: muestra una notificación de error
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          message: `Error adding anecdote: ${error.message}`,
          type: 'error',
        },
      });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    },
    onSuccess: (data) => {
      // Manejo de éxito: muestra una notificación de éxito
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          message: `Anecdote added successfully: "${data.content}"`,
          type: 'success',
        },
      });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    },
    onSettled: () => {
      // Opcional: acciones que se ejecutan sin importar el resultado
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.elements.content.value;

    if (content.length < 5) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          message: 'Anecdote must be at least 5 characters long.',
          type: 'error',
        },
      });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
      return;
    }

    mutation.mutate({ content, votes: 0 });
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
