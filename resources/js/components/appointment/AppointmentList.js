import React, { useContext } from 'react';
import { AppointmentContext } from '../../context/AppointmentContext';
import AppointmentCard from './AppointmentCard';
import { UserContext } from './../../context/UserContext';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const { appointments } = useContext(AppointmentContext)
    const { user } = useContext(UserContext)
    console.log(appointments)
    return (
        <div className='row'>
            <h1>My appointments</h1>
            {user.auth ?

                appointments != null && appointments.length > 0 ? appointments.map(ap => <AppointmentCard key={ap.id} appointment={ap} />) :
                    <h3>You dont have appointments</h3>
                :
                <div className="alert alert-danger" role="alert">
                    Please Login <Link to='/login' className="alert-link">from here</Link>
                </div>
            }

        </div>
    );
}

export default AppointmentList;