import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { ExpertContext } from "../context/ExpertContext";
import 'react-calendar/dist/Calendar.css';
import { UserContext } from './../context/UserContext';
import { toast, ToastContainer } from 'react-toastify'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import img from '../../img/user.png'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ExpertDetails = () => {
    const classes = useStyles();
    let history = useHistory();
    let token = localStorage.getItem('token');
    let bearer = `Bearer ${token}`
    let config = {
        headers: {
            Authorization: bearer
        }
    }
    const { user } = useContext(UserContext)
    let { id } = useParams()
    let { experts } = useContext(ExpertContext)
    const [currentExpert, setCurrentExpert] = useState({})
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('15')
    const [timeSlot, setTimeSlot] = useState('')
    const [sessionDate, setSessionDate] = useState(new Date())
    const [loading, setLoading] = useState(false)


    const splitTimeZone = (str) => {
        if (str.includes('/'))
            return 'Timezone: ' + str.split('/')[0]
        else
            return str
    }

    const changeDuration = async (e) => {
        setLoading(true)
        setDuration(e.target.value)
        let res = await axios.post('/api/update-time-slot', { id: currentExpert.id, duration: e.target.value })
        setCurrentExpert(res.data)
        setLoading(false)

    }

    const checkIfDateAvilable = async (e) => {
        setLoading(true)
        setTimeSlot(e.target.value)
        let res = await axios.post('/api/apointment-avilable',
            {
                id: currentExpert.id,
                date: sessionDate,
                time_slot: e.target.value
            }, config)
        if (res.data > 0) {
            setTimeSlot('')
            toast.error('this date is reserved, pick another one', {
                position: toast.POSITION.TOP_RIGHT
            })
        }

        setLoading(false)

    }

    useEffect(() => {
        let expert = experts.filter(ex => ex.id == id)[0]
        setCurrentExpert(expert)
        if (user != null && user.auth) {
            setName(user.info.name)
        }
    }, [])
    const handleSubmit = async () => {

        if (name.length <= 0 || duration == '0' || timeSlot == '') {
            toast.error('All information are required', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }


        let formData = {
            client_id: user.info.id,
            expert_id: currentExpert.id,
            begin: sessionDate,
            duration: duration,
            time_slot: timeSlot
        }
            (formData)


        try {
            let result = await axios.post('/api/appointment', formData, config)
            toast.success('Appointment created sucessfully', {
                position: toast.POSITION.TOP_RIGHT,
                onClick: () => history.push('/appointments')
            })
                (result.data)
        } catch (e) {
            console.dir(e)
        }
    }
    return (
        <div className='container'>
            <div style={{ visibility: loading ? 'visible' : 'hidden' }} className="loading">
                <h2 className='text-white'><div className="lds-dual-ring"></div></h2>
            </div>
            <div className="row">
                <div className="col-md-3 white-container">
                    <div className="profile">
                        <div className="img-container"><img className='profile-img' src={img} /></div>
                        <h3>{currentExpert.name}</h3>
                        <br />
                        <Chip label={'Expert: ' + currentExpert.expert} color="primary" />
                        <br />
                        <br />
                        <Chip label={'Country: ' + currentExpert.country} color="primary" />
                    </div>
                </div>
                <div className="col-md-8 display-flex justify-content-center">

                    <div className="white-container main-content">
                        <h2>Register new appointmen</h2>
                        <Chip label={'Avilable time: ' + currentExpert.expert_start_time + '   To   ' + currentExpert.expert_end_time} color="secondary" />
                        <p>{user.info && splitTimeZone(user.info.timezone)}</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">

                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Appointment Date"
                                    format="MM/dd/yyyy"
                                    value={sessionDate}
                                    onChange={(date) => setSessionDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <FormControl style={{ minWidth: 250 }} className={classes.formControl}>
                                    <InputLabel htmlFor="duration">Duration</InputLabel>
                                    <Select
                                        native
                                        value={duration}
                                        onChange={changeDuration}
                                        inputProps={{
                                            name: 'Session duration',
                                            id: 'duration',
                                        }}
                                    >
                                        <option value={15}>15 minuts</option>
                                        <option value={30}>30 minuts</option>
                                        <option value={45}>45 minuts</option>
                                        <option value={60}>1 hour</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <br />
                        <br />
                        <Grid container justify="space-around">

                            <FormControl style={{ minWidth: 250 }} className={classes.formControl}>
                                <InputLabel htmlFor="time">Time Slot</InputLabel>
                                <Select
                                    native
                                    value={timeSlot}
                                    onChange={checkIfDateAvilable}
                                    inputProps={{
                                        name: 'Time Slot',
                                        id: 'Time',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {currentExpert.time_slot && currentExpert.time_slot.map((time, index) => {
                                        if (index == currentExpert.time_slot.length - 1) return
                                        return <option key={index} value={'from ' + time + ' to ' + currentExpert.time_slot[index + 1]}>from {time} to {currentExpert.time_slot[index + 1]}</option>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={{ minWidth: 250 }} className={classes.formControl}>
                                <TextField value={name}
                                    onChange={val => setName(val.target.value)} disabled={!user.auth} id="standard-basic" label="Name" />
                            </FormControl>
                        </Grid>




                        {user.auth ?
                            <Button style={{ minWidth: 200 }} className='confirm-btn' onClick={handleSubmit} variant="contained" color="primary">
                                Confirm
                            </Button>
                            :
                            <Link to='/login' className='btn btn-danger login-danger'>Please Login</Link>
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
