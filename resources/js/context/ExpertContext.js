import React, {createContext, useEffect, useReducer} from 'react'
import { expertsReducer } from './../reducers/expertsReducer';
export const ExpertContext = createContext()

const ExpertContextProvider = (props)=>{


    const [experts, dispatch] = useReducer(expertsReducer, {})

    useEffect( ()=>{
        if(experts.length > 0){
            return
        }

        axios.get('/api/experts').then(res=>{
            dispatch({type:'SET_EXPERTS',experts:res.data})
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
