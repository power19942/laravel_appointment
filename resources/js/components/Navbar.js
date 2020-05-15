import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
}));
const Navbar = () => {
    const classes = useStyles();
    const { user, addUser/*, authenticated,setAuthenticated*/ } = useContext(UserContext)
    let userName = user.auth ? user != null ? user.info.name : 'Welcome' : 'Welcome'

    let history = useHistory()
    const logout = () => {

        localStorage.clear()
        addUser({}, false)
        history.push('/')
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link} to='/' variant="h6" className={classes.title}>
                        Laravel Appointments
                    </Typography>

                    {!user.auth ?
                        <>
                            <Button component={Link} to='/login'
                                color="inherit">Login
                    </Button>
                            <Button component={Link} to='/register'
                                color="inherit">Register
                    </Button>
                        </>
                        :
                        <Button onClick={logout}
                            color="inherit">Logout
                    </Button>
                    }
                </Toolbar>
            </AppBar>
            <nav style={{ marginBottom: '20px' }} className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                        </ul>

                        <ul className="navbar-nav ml-auto">

                            {!user.auth ?
                                <></> :
                                <li className="nav-item dropdown">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {userName} <span className="caret"></span>
                                    </a>


                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                                        <>
                                            {/* <Link to='/Login' className="dropdown-item" >
                                                Login
                                        </Link>
                                            <Link to='/Register' className="dropdown-item" >
                                                Register
                                        </Link> */}


                                            <Link to='/appointments' className="dropdown-item" >
                                                My appointments
                                            </Link>

                                        </>



                                    </div>


                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
