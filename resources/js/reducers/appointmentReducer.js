export const appointmentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_APPOINTMENT':
            return [...action.appointments]
        case 'SET_APPOINTMENT':
            console.log('SET_APPOINTMENT', state)
            return action.appointments

        default:
            return state
    }
}