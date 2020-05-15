import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExpertContext } from "../context/ExpertContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { UserContext } from './../context/UserContext';
import { toast, ToastContainer } from 'react-toastify'


const ExpertDetails = () => {
    const { user, addUser } = useContext(UserContext)
    let { id } = useParams()
    let { experts } = useContext(ExpertContext)
    const [currentExpert, setCurrentExpert] = useState({})
    const [name, setName] = useState('')
    const [sessionTime, setSessionTime] = useState('0')
    const [sessionDate, setSessionDate] = useState(new Date())
    const [error, setError] = useState({})

    useEffect(() => {
        setCurrentExpert(experts.filter(ex => ex.id == id)[0])
        if (user != null && user.auth) {
            setName(user.info.name)
        }
        // console.log(sessionTime)
        // console.log(moment(sessionDate).format('DD/MM/yyyy'))
    }, [])
    const handleSubmit = async () => {
        if (name.length <= 0 || sessionTime == '0')
            setError({ ...error, sessionTime: 'Required' })
        toast.error('All information are required', {
            position: toast.POSITION.TOP_RIGHT
        })
        let token = localStorage.getItem('token');
        let bearer = `Bearer ${token}`

        let config = {
            headers: {
                Authorization: bearer
            }
        }
        let formData = {
            client_id: user.info.id,
            expert_id: currentExpert.id,
            begin: sessionDate,
            duration: sessionTime,
        }
        try {
            let result = await axios.post('/api/appointment', formData, config)
            console.log(result.data)
        } catch (e) {
            console.dir(e)
        }
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-3 white-container">
                    <div className="white-container profile">
                        <img className='img-thumbnail' src='https://placehold.it/150' />
                        <h3>{currentExpert.name}</h3>
                        <h5>{currentExpert.expert}</h5>
                        <p>{currentExpert.country}</p>
                    </div>
                </div>
                <div className="col-md-8 display-flex justify-content-center">

                    <div className="white-container main-content">
                        <h1>{currentExpert.name}</h1>
                        <h3>{currentExpert.expert}</h3>
                        <p>{currentExpert.country}</p>
                        <p>{currentExpert.expert_start_time} -> {currentExpert.expert_end_time}</p>
                        <p>{user.info.timezone}</p>
                        <Calendar onChange={(date) => setSessionDate(date)} tileDisabled={({ activeStartDate, date, view }) => {
                            date.getDay() === 5
                            // console.dir(date)
                        }} />


                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                                Duration </label>

                            <div className="col-md-8">
                                <select onChange={(e) => setSessionTime(e.target.value)} className='form-control' name="" id="">
                                    <option value="0">Session duration</option>
                                    <option value="15">15 minuts</option>
                                    <option value="30">30 minuts</option>
                                    <option value="45">45 minuts</option>
                                    <option value="60">1 hour</option>
                                </select>
                                {error.sessionTime && <strong className='text-danger'>Required</strong>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-md-4 col-form-label text-md-right">
                                name </label>

                            <div className="col-md-8">
                                <input disabled={!user.auth} id="name" type="text" value={name}
                                    onChange={val => setName(val.target.value)}
                                    className="form-control" name="name"
                                    required autoFocus />
                            </div>
                        </div>
                        {user.auth ?
                            <button onClick={handleSubmit} className='btn btn-success'>Complete</button>
                            :
                            <Link to='/login' className='btn btn-danger'>Please Login</Link>
                        }
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ExpertDetails
