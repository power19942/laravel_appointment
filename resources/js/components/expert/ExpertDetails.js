import React, {useContext, useEffect, useState} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {ExpertContext} from "../../context/ExpertContext";
import momentTZ from 'moment-timezone';
import {UserContext} from '../../context/UserContext';
import {toast, ToastContainer} from 'react-toastify'

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
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import img from '../../../img/user.png'


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
    let axiosConfig = {
        headers: {
            Authorization: bearer
        }
    }
    const {user} = useContext(UserContext)
    let {id} = useParams()
    let {experts} = useContext(ExpertContext)
    const [currentExpert, setCurrentExpert] = useState({})
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('15')
    const [timeSlot, setTimeSlot] = useState('')
    const [sessionDate, setSessionDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [timezone, setTimezone] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const [originalStartTime, setOriginalStartTime] = useState('')
    const [originalEndTime, setOriginalEndTime] = useState('')


    const splitTimeZone = (str) => {
        try {
            if (str.includes('/'))
                return 'Timezone: ' + str.split('/')[0]
            else
                return str
        } catch (e) {
            return ''
        }
    }

    const changeTimeZone = async (e) => {
        setLoading(true)
        try {
            let timezone = e.target.value
            let res = await axios.post('/api/change-time-zone', {
                timezone: timezone,
                id: currentExpert.id,
                duration: duration
            })
            setTimezone(timezone)
            setCurrentExpert(res.data)
            setStartTime(res.data.expert_start_time)
            setEndTime(res.data.expert_end_time)
        } catch (e) {
            console.dir(e)
        }
        setLoading(false)

    }
    const changeDuration = async (e) => {
        setLoading(true)
        setDuration(e.target.value)
        let res = await axios.post('/api/update-time-slot',
            {
                id: currentExpert.id,
                duration: e.target.value,
                timezone:timezone
            },axiosConfig)
        setCurrentExpert(res.data)
        setLoading(false)

    }

    const checkIfDateAvilable = async (e) => {
        setTimeSlot(e.target.value)
        if (e.target.value == '') return
        setLoading(true)
        try {
            let res = await axios.post('/api/apointment-avilable',
                {
                    id: currentExpert.id,
                    date: sessionDate,
                    begin: sessionDate.toDateString(),


                    start:originalStartTime,
                    end:originalEndTime,
                    duration: duration,

                    time_slot_index: e.target.value
                }, axiosConfig)
            if (res.data > 0) {
                setTimeSlot('')
                toast.error('this date is reserved, pick another one', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        } catch (e) {

        }

        setLoading(false)

    }

    useEffect(() => {
        if (user.auth)
            setTimezone(user.info.timezone)
        let expert = experts.filter(ex => ex.id == id)[0]
        console.log(expert)
        setCurrentExpert(expert)
        setStartTime(expert.expert_start_time)
        setEndTime(expert.expert_end_time)
        setOriginalStartTime(expert.expert_start_time)
        setOriginalEndTime(expert.expert_end_time)

        if (user != null && user.auth) {
            setName(user.info.name)
        }
    }, [])

    const handleSubmit = async () => {
        if (name.length <= 0 || duration == '0' || timeSlot == '') {
            toast.error('All information are required', {
                position: toast.POSITION.TOP_RIGHT
            })

        } else {
            let formData = {
                client_id: user.info.id,
                expert_id: currentExpert.id,
                begin: new Date(sessionDate.toDateString()).toDateString(),
                full_date: sessionDate.toDateString(),
                start:originalStartTime,
                end:originalEndTime,
                duration: duration,
                time_slot_index: timeSlot
            }

            try {
                let result = await axios.post('/api/appointment', formData, axiosConfig)
                setTimeSlot('')
                toast.success(`Appointment created successfully on \n
                    ${sessionDate.toDateString()} from ${result.data}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    onClick: () => history.push('/appointments')
                })
                console.log(result.data)
            } catch (e) {
                console.dir(e)
            }
        }
    }
    return (
        <div className='container'>
            <div style={{visibility: loading ? 'visible' : 'hidden'}} className="loading">
                <h2 className='text-white'>
                    <div className="lds-dual-ring"></div>
                </h2>
            </div>
            <div className="row">
                <div className="col-md-3 white-container">
                    <div className="profile">
                        <div className="img-container"><img className='profile-img' src={img}/></div>
                        <h3>{currentExpert.name}</h3>
                        <br/>
                        <Chip label={'Expert: ' + currentExpert.expert} color="primary"/>
                        <br/>
                        <br/>
                        <Chip label={'Country: ' + currentExpert.country} color="primary"/>
                    </div>
                </div>
                <div className="col-md-8 display-flex justify-content-center">

                    <div className="white-container main-content">
                        <h2>Register new appointmen</h2>
                        <Chip
                            label={'Avilable time: ' + startTime + '   To   ' + endTime}
                            color="secondary"/>
                        <p>{timezone}</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">


                                <KeyboardDatePicker
                                    disabled={!user.auth}
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
                                <FormControl style={{minWidth: 250, marginTop: '13px'}} className={classes.formControl}>
                                    <InputLabel htmlFor="duration">Duration</InputLabel>
                                    <Select
                                        disabled={!user.auth}
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
                        <br/>
                        <br/>
                        <Grid container justify="space-around">

                            <FormControl style={{minWidth: 250}} className={classes.formControl}>
                                <InputLabel htmlFor="time">Time Slot</InputLabel>
                                <Select
                                    disabled={!user.auth}
                                    native
                                    value={timeSlot}
                                    onChange={checkIfDateAvilable}
                                    inputProps={{
                                        name: 'Time Slot',
                                        id: 'Time',
                                    }}
                                >
                                    <option aria-label="None" value=""/>
                                    {currentExpert.time_slot && currentExpert.time_slot.map((time, index) => {
                                        if (index == currentExpert.time_slot.length - 1) return
                                        return <option key={index}
                                                       value={index}>from {time} to {currentExpert.time_slot[index + 1]}</option>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={{minWidth: 250}} className={classes.formControl}>
                                <InputLabel htmlFor="timezones">Timezone</InputLabel>
                                <Select
                                    disabled={!user.auth}
                                    native
                                    value={timezone}
                                    onChange={changeTimeZone}
                                    inputProps={{
                                        name: '',
                                        id: 'Timezone',
                                    }}
                                >
                                    <option aria-label="None" value=""/>
                                    {momentTZ.tz.names().map((time, index) => {
                                        return <option key={index}
                                                       value={time}>{time}</option>
                                    })}
                                </Select>
                            </FormControl>


                            <FormControl style={{minWidth: 250, marginTop: '20px'}} className={classes.formControl}>
                                <TextField value={name} disabled={!user.auth}
                                           onChange={val => setName(val.target.value)} disabled={!user.auth}
                                           id="standard-basic" label="Name"/>
                            </FormControl>
                        </Grid>


                        {user.auth ?
                            <Button style={{minWidth: 200}} className='confirm-btn' onClick={handleSubmit}
                                    variant="contained" color="primary">
                                Confirm
                            </Button>
                            :
                            <Link to='/login' className='btn btn-danger login-danger'>Please Login</Link>
                        }
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default ExpertDetails
