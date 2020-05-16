export const appointmentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_APPOINTMENT':
            return state
        case 'SET_APPOINTMENT':
            ('SET_APPOINTMENT', state)
            return action.appointments

        default:
            return state
    }
}