import React, { Component } from "react";
import axios from "axios";

import Ip from "../../../preferences/Ip";

export default class Signup extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    retypePassword: "",
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
              type="text"
              className="form-control item"
              id="username"
              placeholder="Username"
              value={this.state.userName}
              onChange={this.onChangeUsername}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control item"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="retypePassword"
              placeholder="Retype Password"
              value={this.state.retypePassword}
              onChange={this.onChangeRetypePassword}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block create-account">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  onChangeUsername = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };

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

  onChangeRetypePassword = (e) => {
    this.setState({
      retypePassword: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if(this.state.password==this.state.retypePassword){
      const user = {
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        role: 2,
        type: true
      }
      let route = Ip.getHost()+"/api/users-register"
      var res = await axios.post(route, user);
      res = res.data;
      if(res>0){
        alert(`Usuario ${res} creado Exitosamente`);
        window.location.href="/login"
      }else{
        alert(`Usuario no registrado! Intente nuevamente`);
      }
    }else{
      alert("Las contraseñas son diferentes!");
    }
  };
}
