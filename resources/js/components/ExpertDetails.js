import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExpertContext } from "../context/ExpertContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { UserContext } from './../context/UserContext';
import { toast, ToastContainer } from 'react-toastify'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const { user, addUser } = useContext(UserContext)
    let { id } = useParams()
    let { experts } = useContext(ExpertContext)
    const [currentExpert, setCurrentExpert] = useState({})
    const [name, setName] = useState('')
    const [sessionTime, setSessionTime] = useState('0')
    const [sessionDate, setSessionDate] = useState(new Date())
    const [error, setError] = useState({})
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
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
                        {/* <Calendar onChange={(date) => setSessionDate(date)} tileDisabled={({ activeStartDate, date, view }) => {
                            date.getDay() === 5
                            // console.dir(date)
                        }} /> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">

                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Appointment Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Appointment Time"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                            <Select
                                native
                                value={sessionTime}
                                onChange={(e) => setSessionTime(e.target.value)}
                                inputProps={{
                                    name: 'Session duration',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={15}>15 minuts</option>
                                <option value={30}>30 minuts</option>
                                <option value={45}>45 minuts</option>
                                <option value={60}>1 hour</option>
                            </Select>
                        </FormControl>

                        <TextField value={name}
                            onChange={val => setName(val.target.value)} disabled={!user.auth} id="standard-basic" label="Name" />

                        
                        {user.auth ?
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Confirm
                            </Button>
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
