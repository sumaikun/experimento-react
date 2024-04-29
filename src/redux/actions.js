export const registerUser = (user) => ({
    type: 'REGISTER_USER',
    payload: user
  });
  
  export const setCurrentUser = (email) => ({
    type: 'SET_CURRENT_USER',
    payload: { email }
  });
  
  export const addUserAction = (actionDetail) => ({
    type: 'ADD_USER_ACTION',
    payload: actionDetail
  });
  