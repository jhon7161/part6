// components/AnecdoteForm.jsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Anecdote added successfully!' });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    },
    onError: (error) => {
      console.error('Error adding anecdote:', error);
      dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Error adding anecdote.' });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long.');
      return;
    }

    mutation.mutate({ content, votes: 0 });
    setContent('');
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
      </form>
    </div>
  );
};

export default AnecdoteForm;
