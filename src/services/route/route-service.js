import React from 'react'
import Guard from "../auth/guard";
import Login from "../auth/login";

const RouteService = ({Component}) => {
    if (Guard()){
        return <Component />
    } else {
        return <Component />
    }
}

export default RouteService
