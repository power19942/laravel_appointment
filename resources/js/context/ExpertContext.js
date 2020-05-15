import React, {createContext, useEffect, useState,useReducer} from 'react'
import { expertsReducer } from './../reducers/expertsReducer';
export const ExpertContext = createContext()

const ExpertContextProvider = (props)=>{
    // const [experts,setExperts] = useState([]/*,()=>{
        // console.log('set callback')
        // const localData = localStorage.getItem('experts');
        // return localData ? JSON.parse(localData) : [];
    // }*/)

    const [experts, dispatch] = useReducer(expertsReducer, {}, ()=>{
        const localData = localStorage.getItem('experts');
    return localData ? JSON.parse(localData) : {};
    })

    useEffect( ()=>{
        if(experts.length > 0){
            return
        }
        axios.get('/api/experts').then(res=>{
            // setExperts(res.data)
            dispatch({type:'SET_EXPERTS',experts:res.data})
            // debugger
            localStorage.setItem('experts', JSON.stringify(res.data));
        })
    },[])

    return (
        <ExpertContext.Provider value={{experts}}>
            {props.children}
        </ExpertContext.Provider>
    )
}

export default ExpertContextProvider
