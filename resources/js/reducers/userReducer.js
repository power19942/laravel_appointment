import {GET_USER, SET_USER} from "../types";

export const userReducer = (state = { info: {}, auth: false }, action) => {
    switch (action.type) {
        case GET_USER:
            return state
        case SET_USER:
            return { info: action.info, auth: action.auth }
        default:
            return state
    }
}
