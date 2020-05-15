import React, {useEffect,useState,useContext} from 'react'
import ExpertCard from "./ExpertCard";
import {ExpertContext} from "../context/ExpertContext";
const ExpertList =()=>{

    const {experts} = useContext(ExpertContext)



    return experts.length ? (
        <>
            {experts.map((expert=> <ExpertCard key={expert.id} user={expert}/>))}
        </>
    ) : <h2>No Experts</h2>
}


export default ExpertList
