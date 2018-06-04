const initialState = {
    login: false,
}

const authenticatedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('LOGIN', action.value)
            return {...state, login: state.login = action.value};
        default:
            return state;
    }
}

export default authenticatedReducer