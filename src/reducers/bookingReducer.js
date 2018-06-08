const INITIAL_STATE = {
    isFetching: false,
    bookings: [],
    error: false
}

const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_BOOKINGS_REQUEST':
            return {
                ...state,
                isFetching: true,
                bookings: [],
                error: false
            }
        case 'LOAD_BOOKINGS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                bookings: action.data,
                erros: false,
            }
        case 'LOAD_BOOKINGS_ERROR':
            return {
                ...state,
                isFetching: false,
                bookings: [],
                error: true
            }
        default:
            return state
    }
}

export default bookingReducer