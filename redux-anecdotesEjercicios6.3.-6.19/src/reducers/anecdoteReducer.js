import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateVote } from '../services/anecdotes'
import { notifyWithTimeout } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes = action.payload.votes
      }
      return state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// Thunk para obtener todas las anécdotas desde el backend
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Thunk para crear una nueva anécdota
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Thunk para votar por una anécdota
export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const returnedAnecdote = await updateVote(id, updatedAnecdote)
    dispatch(voteAnecdote(returnedAnecdote))
    dispatch(notifyWithTimeout(`You voted for "${anecdoteToVote.content}"`)) // Notificación dura 5 segundos
  }
}

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
