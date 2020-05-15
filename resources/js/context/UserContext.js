import React, { createContext, useEffect, useReducer } from 'react'
import { userReducer } from './../reducers/userReducer';
export const UserContext = createContext()

const UserContextProvider = (props) => {
    // let currentUser = {}
    // const localData = localStorage.getItem('user');
    // return localData ? JSON.parse(localData) :{};
    // currentUser = localData
    // const [user, setUser] = useState({})
    // const [authenticated, setAuthenticated] = useState(false)


    const [user, dispatch] = useReducer(userReducer, {}, () => {
        const localData = localStorage.getItem('user');
        return localData ? {info:JSON.parse(localData),auth:true} : {};
    })

    const addUser = (user,auth) => {
        // setUser(user)
        // setAuthenticated(true)
        dispatch({ type: 'SET_USER', info: user, auth: auth })
    }

    // useEffect(() => {
    //     const localData = localStorage.getItem('user');
    //     let currentUser = JSON.parse(localData)
    //     if (currentUser != null && Object.keys(currentUser).length > 0)
    //         setUser(currentUser)
    //     if (user != null && Object.keys(user).length > 0)
    //         setAuthenticated(true)
    // }, [])

    return (
        <UserContext.Provider value={{ user, addUser/*, setAuthenticated, authenticated*/ }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
