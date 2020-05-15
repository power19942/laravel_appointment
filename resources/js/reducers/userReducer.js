export const userReducer = (state = { info: {}, auth: false }, action) => {
    switch (action.type) {
        case 'GET_USER':
            return state
        case 'SET_USER':
            console.log('auth', state)
            return { info: action.info, auth: action.auth }
        default:
            return state
    }
}