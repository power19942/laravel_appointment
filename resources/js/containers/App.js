import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/main.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ExpertList from "../components/expert/ExpertList";
import ExpertPage from "../components/expert/ExpertsPage";
import ExpertDetails from "../components/expert/ExpertDetails";
import ExpertContextProvider from "../context/ExpertContext";
import Navbar from "../components/Navbar";
import Login from '../components/auth/Login'
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from "../context/UserContext";
import Register from '../components/auth/Register';
import Appointment from './Appointment';

function App() {
    return (
        <Router>
            <UserContextProvider>
                <ExpertContextProvider>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route path='/details/:id' component={ExpertDetails}/>
                            <Route path='/appointments' component={Appointment}/>
                            <Route path='/Login' component={Login}/>
                            <Route path='/Register' component={Register}/>
                            <Route exact path='/' component={ExpertPage}/>
                        </Switch>
                    </div>
                </ExpertContextProvider>
            </UserContextProvider>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
