// const initialState = {
//     login: false,
//     id: '',
//     username: ''
// }

const authenticatedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            // console.log('LOGIN', action.value.data_user[0])
            return {
                ...state,
                login: state.login = action.value.status,
                id: state.id = action.value.data_user[0].id,
                username: state.username = action.value.data_user[0].username
            }
        case 'LOGOUT':
            return {...state, login: state.login = action.value.status}
        default:
            return state;
    }
}

export default authenticatedReducer