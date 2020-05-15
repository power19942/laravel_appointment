import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { useHistory } from 'react-router-dom'
const Navbar = () => {
    // useEffect(()=>{
    //     if (localStorage.getItem('user') != null){
    //
    //     }
    // })
    const { user, addUser/*, authenticated,setAuthenticated*/ } = useContext(UserContext)
    // const [currentUser, setCurrentUser] = useState(user)
    let userName = user.auth ? user != null ? user.info.name : 'Welcome' : 'Welcome'
    // console.log('nav auth',user.auth)
    // console.log('nav',JSON.parse(user).name)
    // console.dir(user)
    let history = useHistory()
    const logout = () => {

        localStorage.clear()
        // setAuthenticated(false)
        addUser({}, false)
        history.push('/')
    }
    return (
        <nav style={{ marginBottom: '20px' }} className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link to='/' className="navbar-brand" >
                    Laravel Appointment
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>

                    <ul className="navbar-nav ml-auto">


                        <li className="nav-item dropdown">
                            <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {userName} <span className="caret"></span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                {!user.auth ?
                                    <>
                                        <Link to='/Login' className="dropdown-item" >
                                            Login
                                        </Link>
                                        <Link to='/Register' className="dropdown-item" >
                                            Register
                                        </Link>
                                        <Link to='/appointments' className="dropdown-item" >
                                            My appointments
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link to='/appointments' className="dropdown-item" >
                                            My appointments
                                        </Link>
                                        <button onClick={logout} className="dropdown-item">Logout</button>
                                    </>
                                }



                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
