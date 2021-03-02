import anecdoteService from '../services/anecdotes'

let initial = []

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
     return state.map(anecdote => anecdote.id === action.id ? action.data: anecdote)
  }

    case 'ADDANECDOTE':
    return [...state, action.data]

    case 'FILTER': {
      state = initial
      if (action.filterContent === ''){
        return state
      }else{
        return state.filter(anecdote => anecdote.content.includes(action.filterContent))
      }
    }

    case 'INIT_ANECDOTE' :
    initial = action.data
    return action.data
  default: return state
}
}


export default anecdoteReducer


export const addVote = (id, vote, content) => {
  return async dispatch => {
    const votedAnedote = await anecdoteService.vote(id, vote, content)
    dispatch({
    type: 'VOTE',
    id: id,
    data: votedAnedote
    })
  }
}


export const addAnecdote = (content) => {
  return async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch({
    type: 'ADDANECDOTE',
    data: newAnecdote
    })
  }
}

export const filterAnecdote = (filterContent) => (
  {
    type: 'FILTER',
    filterContent: filterContent
  }
)

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdote
    })
  }
}
