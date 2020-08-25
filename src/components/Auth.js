import React, { Component } from 'react'
import { USER_EMAIL } from '../config/Const'
import { Redirect } from 'react-router-dom'

export default function Auth({component}) {
    if(!localStorage.getItem(USER_EMAIL)){
        return <Redirect to="/"></Redirect>;
    }
    return <Component></Component>;
}
