import React from 'react';

const AppointmentCard = (props) => {
    return (
        <div className="card text-white bg-success mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-header">Expert name: <strong> {props.appointment.appointment_expert.name}</strong></div>
            <div className="card-body">
                <h5 className="card-title">Date:</h5>
    <p className="card-text">{props.appointment.begin}</p>
            </div>
        </div>
    );
}

export default AppointmentCard;