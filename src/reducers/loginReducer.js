const INITIAL_STATE = {
    data: [],
    isLogged: false,
    isFetching: false,
    error: false
}

const loginReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'LOAD_LOGIN_REQUEST') {
        return {
            isFetching: true,
            data: [],
            isLogged: false,
            error: false
        }
    } else if (action.type === 'LOAD_LOGIN_SUCCESS') {
        return {
            isFetching: false,
            data: action.data[0],
            isLogged: true,
            error: false
        }
    } else if (action.type === 'LOAD_LOGIN_ERROR') {
        return {
            isFetching: false,
            data: [],
            isLogged: false,
            error: true
        }
    }

    return state
}

export default loginReducer