const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
    initialState.good+=1
    state = initialState
      return state
    case 'OK':
    initialState.ok+=1
    state = initialState
      return state
    case 'BAD':
    initialState.bad+=1
    state = initialState
      return state
    case 'ZERO': {
      for(var key in initialState) {
        initialState[key] = 0;
      }
      state = initialState
      return state
    }
    default: return state
  }

}

export default counterReducer
