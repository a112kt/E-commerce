import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectRoutes(props) {
    if(localStorage.getItem("userToken")){
        return props.children;

    }else{
       return <Navigate to="/Login"></Navigate>
    }
}
