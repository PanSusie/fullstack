import React from 'react'
//import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    // const added = await anecdoteService.createNew(content)
    // dispatch(addAnecdote(added))
    // dispatch(addNotification(content))
    // dispatch(addAnecdote(content))
    // dispatch(setNotification(`you created '${content}'`, 5000))
    props.addAnecdote(content)
    props.setNotification(`you created '${content}'`, 5000)
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
      <div><input name='newAnecdote'/></div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  addAnecdote: addAnecdote,
  setNotification: setNotification
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)
