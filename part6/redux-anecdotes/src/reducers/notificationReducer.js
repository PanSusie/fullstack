const defaultContent = null

const notificationReducer = (state = defaultContent , action) => {
  switch (action.type){
    case 'NOTE':
    state = action.content
    return action.content
    default:
    return state
  }
}

let timeoutID

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: 'NOTE',
      content: content
    })

    if(timeoutID){
    clearTimeout(timeoutID)
  }

    timeoutID = setTimeout(()=> dispatch({
      type: 'NOTE',
      content: null
    }), duration)

  }
}


export default notificationReducer
