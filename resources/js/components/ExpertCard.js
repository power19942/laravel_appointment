import React from 'react'
import {Link} from 'react-router-dom'

const ExpertCard = ({user}) => {
    return (
        <div className='col-md-4'>
            <div className="card" >
                <img className="card-img-top" src="https://placehold.it/100" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.expert}</p>
                    <Link to={'/details/'+user.id} className="btn btn-primary">More Information</Link>
                </div>
            </div>
        </div>
    )
}

export default ExpertCard
