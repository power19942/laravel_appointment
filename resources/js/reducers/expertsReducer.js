import {GET_EXPERTS, SET_EXPERTS} from "../types";

export const expertsReducer = (state, action) => {
    switch (action.type) {
        case GET_EXPERTS:
            return state
        case SET_EXPERTS:
            return action.experts
        default:
            return state
    }
}
