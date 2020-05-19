import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import Button from '@material-ui/core/Button';
const Register = () => {
    const { addUser } = useContext(UserContext)
    let history = useHistory();
    const [loading, setLoading] = useState(false)
    //TODO: remove default value
    const [username, setUsername] = useState('om')
    const [email, setEmail] = useState('o@o.com')
    const [password, setPassword] = useState('11111111')
    const [passwordConfirm, setPasswordConfirm] = useState('11111111')

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            var res = await axios.post('/api/register', {
                name: username,
                email,
                password,
                password_confirmation: passwordConfirm
            })
            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(res.data.data.info))
            localStorage.setItem('token', res.data.data.token)
            addUser(res.data.data.info, true)
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
            <div style={{visibility: loading ? 'visible' : 'hidden'}} className="loading">
                <h2 className='text-white'>
                    <div className="lds-dual-ring"></div>
                </h2>
            </div>
            <div className="col-md-8">
                <div className="card login-card">
                    <div className="card-header">Register</div>

                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>

                            <div className="form-group row">
                                <label htmlFor="username" className="col-md-4 col-form-label text-md-right">
                                    Username </label>

                                <div className="col-md-6">
                                    <input id="username" type="text" value={username}
                                        className="form-control" name="username"
                                        required autoFocus onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
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
                                <label htmlFor="passwordConfirm" className="col-md-4 col-form-label text-md-right">
                                    Password Confirm</label>

                                <div className="col-md-6">
                                    <input id="passwordConfirm" type="password"
                                        value={passwordConfirm}
                                        className="form-control "
                                        name="passwordConfirm" required onChange={(e) => setPasswordConfirm(e.target.value)} />


                                </div>
                            </div>


                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <Button type="submit" style={{ minWidth: 100 }} disabled={loading} variant="contained" color="primary">
                                        Register
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
export default Register
