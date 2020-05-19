import React, { createContext, useReducer } from 'react'
import { userReducer } from './../reducers/userReducer';
import {SET_USER} from "../types";
export const UserContext = createContext()

const UserContextProvider = (props) => {

    const [user, dispatch] = useReducer(userReducer, {}, () => {
        const localData = localStorage.getItem('user');
        return localData ? {info:JSON.parse(localData),auth:true} : {};
    })

    const addUser = (user,auth) => {

        dispatch({ type: SET_USER, info: user, auth: auth })
    }

    return (
        <UserContext.Provider value={{ user, addUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
