const initialState = {
    users: [],
    currentUser: null,
    nextUserId: 1,  // To track the next user ID
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER':
        const emailExists = state.users.some(user => user.email === action.payload.email);
        if (!emailExists) {
          const newUser = {
            ...action.payload,
            id: state.nextUserId,
            actions: []
          };
          return {
            ...state,
            users: [...state.users, newUser],
            currentUser: newUser.id,
            nextUserId: + state.nextUserId + 1
          };
        }
        break;
  
      case 'SET_CURRENT_USER':
        const existingUser = state.users.find(user => user.email === action.payload.email);
        if (existingUser) {
          return {
            ...state,
            currentUser: existingUser.id
          };
        }
        break;
  
      case 'ADD_USER_ACTION':
        return {
          ...state,
          users: state.users.map(user =>
            user.id === state.currentUser ? { ...user, actions: [...user.actions, action.payload] } : user
          )
        };
  
      default:
        return state;
    }
    return state;
  };
  
  export default userReducer;
  