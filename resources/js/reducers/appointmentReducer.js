import {GET_APPOINTMENT, SET_APPOINTMENT} from "../types";

export const appointmentReducer = (state, action) => {
    switch (action.type) {
        case GET_APPOINTMENT:
            return state
        case SET_APPOINTMENT:
            return action.appointments

        default:
            return state
    }
}
