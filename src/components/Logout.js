import { CLIENT_DATA, PRODUCT_LIST} from "../config/Const";
import { Redirect } from "react-router-dom";
import React, { Component } from 'react'

export default class Logout extends Component {
    render() {
        localStorage.removeItem(CLIENT_DATA);
        localStorage.removeItem(PRODUCT_LIST);
        return (
            <Redirect to="/"></Redirect>
        );
    }
}
