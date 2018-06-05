export const loginSuccess = (value) =>{
  return {
    type: 'LOGIN',
    value: value
  };
}

export function logout(value) {
  return {
    type: 'LOGOUT',
    value: value
  };
}


/*
function loginError(value) {
  return {
    type: 'LOGIN_ERROR',
    value: value
  };
}

function loginRequest(username, password) {
  return {
    type: 'LOGIN_REQUEST',
    payload: {
      username,
      password
    },
  };
}
*/
