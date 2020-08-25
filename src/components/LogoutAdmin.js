import {ADMIN_DATA } from "../config/Const";
import { Redirect } from "react-router-dom";
import React, { Component } from 'react'

export default class LogoutAdmin extends Component {
    render() {
        localStorage.removeItem(ADMIN_DATA);
        return (
            <Redirect to="/login"></Redirect>
        );
    }
}