import { CLIENT_DATA} from "../config/Const";
import { Redirect } from "react-router-dom";
import React, { Component } from 'react'

export default class Logout extends Component {
    render() {
        localStorage.removeItem(CLIENT_DATA);
        return (
            <Redirect to="/"></Redirect>
        );
    }
}
