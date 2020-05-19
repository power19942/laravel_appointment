import React, { createContext, useEffect, useReducer, useContext } from 'react'
import { appointmentReducer } from './../reducers/appointmentReducer';
import { UserContext } from './UserContext';
import {SET_APPOINTMENT} from "../types";

export const AppointmentContext = createContext()

const AppointmentContextProvider = (props) => {

    const [appointments, dispatch] = useReducer(appointmentReducer, {}, () => {
        const localData = localStorage.getItem('appointments');
        return localData ? JSON.parse(localData) : {};
    })



    const { user, addUser } = useContext(UserContext)

    const logout = () => {
        localStorage.clear()
        addUser({}, false)
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        let bearer = `Bearer ${token}`

        let config = {
            headers: {
                Authorization: bearer
            }
        }
        axios.get('/api/appointment', config).then(res => {
            dispatch({ type: SET_APPOINTMENT, appointments: res.data })
            localStorage.setItem('appointments', JSON.stringify(res.data));
        }).catch(e => {
        })
    }, [])

    return (
        <AppointmentContext.Provider value={{ appointments, dispatch }}>
            {props.children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider
