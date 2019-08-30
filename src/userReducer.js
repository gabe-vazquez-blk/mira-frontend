const defaultState = {
  currentUser: null,
}

function userReducer(prevState = defaultState, action) {
  switch (action.type) {
    case "CURRENTUSER":
      return { ...prevState, currentUser: action.payload }
    default:
      return prevState
  }
}

export default userReducer