import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Login';

const Protected = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
       let data = JSON.parse(localStorage.getItem("user"))
       if (data) setState(true) 
    }, [])
    return (
        <div>
           {
            state ? <Outlet /> : <Login />
           } 
        </div>
    );
}

export default Protected;
