// src/reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = anecdotesAtStart.map(anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
}))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (!anecdoteToVote) return state // No hacer nada si no se encuentra la anécdota

      // Actualizar el estado de manera inmutable
      return state.map(anecdote =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      ).sort((a, b) => b.votes - a.votes)  // Ordenar por votos
    },
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      // Añadir nueva anécdota y ordenar el estado de manera inmutable
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes)  // Ordenar por votos
    }
  }
})

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
