import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'



const AnecdoteList = (props) => {


  props.anecdotes.sort((a,b) => b.votes-a.votes)


  //const dispatch = useDispatch()

  const vote = (id, votes, content) => {
      // dispatch(addVote(id, votes, content))
      // dispatch(setNotification(`you voted '${content}'`, 5000))
      props.addVote(id, votes, content)
      props.setNotification(`you voted '${content}'`, 5000)
  }

  return (
    <div>
    {props.anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id,anecdote.votes,anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
    addVote: addVote,
    setNotification: setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
