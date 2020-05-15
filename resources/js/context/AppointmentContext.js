import React, { createContext, useState, useEffect, useReducer, useContext } from 'react'
import { appointmentReducer } from './../reducers/appointmentReducer';
import { UserContext } from './UserContext';
import { toast, ToastContainer } from 'react-toastify';

export const AppointmentContext = createContext()

const AppointmentContextProvider = (props) => {

    const [appointments, dispatch] = useReducer(appointmentReducer, {}, () => {
        const localData = localStorage.getItem('appointments');
        return localData ? JSON.parse(localData) : {};
    })



    const { user, addUser } = useContext(UserContext)

    const logout = () => {
        localStorage.clear()
        // setAuthenticated(false)
        addUser({}, false)
    }

    useEffect(() => {
        // if (appointments.length > 0) {
        //     return
        // }
        let token = localStorage.getItem('token');
        let bearer = `Bearer ${token}`

        let config = {
            headers: {
                Authorization: bearer
            }
        }
        axios.get('/api/appointment', config).then(res => {
            dispatch({ type: 'GET_APPOINTMENT', appointments: res.data })
            localStorage.setItem('appointments', JSON.stringify(res.data));
        }).catch(_ => {
            logout()
        })
    }, [])

    return (
        <AppointmentContext.Provider value={{ appointments, dispatch }}>
            {props.children}
            <ToastContainer />
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider
