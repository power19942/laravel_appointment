export const expertsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXPERTS':
            return state
        case 'SET_EXPERTS':
            console.log('set', state)
            return action.experts

        default:
            return state
    }
}