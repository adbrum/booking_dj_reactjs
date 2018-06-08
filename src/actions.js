import axios from 'axios'

export const loginSuccess = (value) => {
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

//REDUX THUNKS
export const loadLoginRequest = () => {
    return {
        type: 'LOAD_LOGIN_REQUEST'
    }
}

export const loadLoginError = () => {
    return {
        type: 'LOAD_LOGIN_ERROR'
    }
}


export const loadLoginSuccess = (data) => {
    return {
        type: 'LOAD_LOGIN_SUCCESS',
        data: data
    }
}


export const loadLogin = (data) => {
    return dispatch => {
        dispatch(loadLoginRequest())
        axios.post('/login/',
            {
                username: data.username,
                password: data.password,
            })
            .then(({data}) => dispatch(loadLoginSuccess(data)))
            .catch(() => dispatch(loadLoginError()))
    }
}


//Booking
export const loadBookingRequest = () => {
    return {
        type: 'LOAD_BOOKINGS_REQUEST'
    }
}

export const loadBookingError = () => {
    return {
        type: 'LOAD_BOOKINGS_ERROR'
    }
}


export const loadBookingSuccess = (bookings) => {
    return {
        type: 'LOAD_BOOKINGS_SUCCESS',
        data: bookings
    }
}

export const loadBooking = (data) => { //data => id
    return dispatch => {
        dispatch(loadBookingRequest())
        axios.post(`/bookings/${data}`)
            .then(({data}) => dispatch(loadBookingSuccess(data)))
            .catch(() => dispatch(loadBookingError()))
    }
}
/*
function loginError(value) {
  return {
    type: 'BOOKINGS_ERROR',
    value: value
  };
}

function loginRequest(username, password) {
  return {
    type: 'BOOKINGS_REQUEST',
    payload: {
      username,
      password
    },
  };
}
*/
