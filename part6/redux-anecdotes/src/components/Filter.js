import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    //dispatch(filterAnecdote(filter))
    props.filterAnecdote(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null,{
  filterAnecdote
})(Filter)
