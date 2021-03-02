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

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: 'NOTE',
      content: content
    })
    const timeoutID = setTimeout(()=> dispatch({
      type: 'NOTE',
      content: null
    }), duration)
    console.log(timeoutID)
    clearTimeout(timeoutID)
  }
}


export default notificationReducer
