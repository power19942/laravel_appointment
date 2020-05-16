import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import Button from '@material-ui/core/Button';

const Login = () => {
    const { user, addUser } = useContext(UserContext)
    let history = useHistory();
    const [loading, setLoading] = useState(false)
    //TODO: remove default value
    const [email, setEmail] = useState('o@o.com')
    const [password, setPassword] = useState('11111111')
    const [rememberMe, setRememberMe] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            var res = await axios.post('/api/login', { email, password, rememberMe })
            localStorage.setItem('user', JSON.stringify(res.data.data.info))
            localStorage.setItem('token', res.data.data.token)
            addUser(res.data.data.info,true)

                setLoading(false)

                history.push("/")
            

        } catch (e) {
            toast.error(e.response.data.errors, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoading(false)
        }

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card login-card">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>

                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                                    Email </label>

                                <div className="col-md-6">
                                    <input id="email" type="email" value={email}
                                        className="form-control" name="email"
                                        required autoFocus onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                                    Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password"
                                        value={password}
                                        className="form-control "
                                        name="password" required onChange={(e) => setPassword(e.target.value)} />


                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember"
                                            id="remember" value={rememberMe}
                                            onChange={(e) => setRememberMe(!rememberMe)} />

                                        <label className="form-check-label" htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    
                                    <Button type="submit" style={{ minWidth: 100 }} disabled={loading}  variant="contained" color="primary">
                                         Login
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Login
