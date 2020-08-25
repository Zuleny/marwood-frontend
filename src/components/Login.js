import React, { Component , useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Ip from '../preferences/Ip';
import {ADMIN_DATA, CLIENT_DATA} from '../config/Const';

export default class LoginClient extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <div className="registration-form">
        <form onSubmit={this.onSubmit}>
          <div className="form-icon">
            <span>
              <i className="icon icon-user" />
            </span>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control item"
              id="email"
              placeholder="Email"
              onChange={this.onChangeEmail}
              value={this.state.email}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={this.state.password}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block create-account">
              Entrar
            </button>
          </div>
          <Link className="text-center" to="/signup">Olvide My Contraseña</Link>
          <h6 className="text-gray">¿No tiene una cuenta?</h6> 
          <Link className="text-center" to="/signup">Registrese</Link>
        </form>
      </div>
    );
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    let route = Ip.getHost()+"/api/users-login"
    var res = await axios.post(route, user);
    res = res.data;
    if(res!=null){
      let isClient = res.type;
      if(isClient){
        localStorage.setItem(CLIENT_DATA, JSON.stringify(res));
        window.location.href = "/";
      }else{
        localStorage.setItem(ADMIN_DATA, JSON.stringify(res));
        window.location.href = "/admin";
      } 
    }else{
      this.setState({password:''});
      alert("Email o Contraseña Incorrectos");
    }
  };
}
