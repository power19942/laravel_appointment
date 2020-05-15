import React, { userReducer } from 'react';
import AppointmentContextProvider from '../context/AppointmentContext'
import AppointmentList from '../components/appointment/AppointmentList';
const Appointment = () => {
    return (
        <AppointmentContextProvider>
            <AppointmentList />
        </AppointmentContextProvider>

    );
}

export default Appointment;