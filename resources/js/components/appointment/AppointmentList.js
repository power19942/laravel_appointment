import React, { useContext,useState } from 'react';
import { AppointmentContext } from '../../context/AppointmentContext';
import AppointmentCard from './AppointmentCard';
import { UserContext } from './../../context/UserContext';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const { appointments,dispatch } = useContext(AppointmentContext)
    const { user } = useContext(UserContext)
    return (
        <div className='row'>
            <div className="col-md-12 white-container">
                <h1 className='mb-5'>My appointments</h1>
                <div className="appointments-container">
                    {user.auth ?

                        appointments != null && appointments.length > 0 ? appointments.map(ap => <AppointmentCard key={ap.id} appointment={ap} />) :
                            <h5 className='text-center'>You dont have any appointments</h5>
                        :
                        <div className="alert alert-danger" role="alert">
                            Please Login <Link to='/login' className="alert-link">from here</Link>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default AppointmentList;