import React, {createContext, useEffect, useReducer, useState} from 'react'
import { expertsReducer } from './../reducers/expertsReducer';
export const ExpertContext = createContext()

const ExpertContextProvider = (props)=>{


    const [experts, dispatch] = useReducer(expertsReducer, {})
    const [loading,setLoading] = useState(false)

    useEffect( ()=>{
        if(experts.length > 0){
            return
        }

        axios.get('/api/experts').then(res=>{
            // setExperts(res.data)
            dispatch({type:'SET_EXPERTS',experts:res.data})
            // debugger
            // localStorage.setItem('experts', JSON.stringify(res.data));
        }).catch(err=>{
            console.dir(err)
        })
    },[])

    return (
        <ExpertContext.Provider value={{experts}}>
            {props.children}
        </ExpertContext.Provider>
    )
}

export default ExpertContextProvider
