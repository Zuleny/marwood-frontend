import React, { Component } from 'react'
import axios from 'axios';

import Ip from '../../../preferences/Ip';
import Header from '../../../partials/admin/Header'
import Menu from '../../../partials/admin/Menu'
import Footer from '../../../partials/admin/Footer'
import ContentHeader from '../../../partials/admin/ContentHeader';

export default class SignupAdmin extends Component {
    render() {
        return (
          <div>
            <Header></Header>
            <Menu></Menu>
            {this.getContent()}
            <Footer></Footer>
          </div>
        );
    }
    state={
        roleList:[],
        userName: '',
        email: '',
        password: '',
        retypePassword: '',
        role: 0,
        type: false,
        editing: false,
        _id: ''
    }
    async componentDidMount(){
        console.log(this.props.match.params);
        let route = Ip.getHost() +"/api/users-roleslist";
        var res = await axios.get(route);
        this.setState({
          roleList : res.data,
          role: res.data[0].id_role
        });

        if(this.props.match.params.id){
          console.log("Update");
          route = Ip.getHost() +"/api/users"+"/"+this.props.match.params.id;
          var data = await axios.get(route);
          data = data.data;
          this.setState({
            userName: data.username,
            email: data.email,
            role: data.id_role,
            type: data.type,
            editing: true,
            _id: this.props.match.params.id
          });
          //document.getElementById("pass").setAttribute("required","");
        }else{
          console.log("Register")
        }
    }

    getRolList(){
        return this.state.roleList.map(role=>{
          return(
          <option value={role.id_role}>{role.role_name}</option>
          );
        })
    }
    
    onChangeUsername = (e)=>{
      this.setState({
        userName: e.target.value
      })
    }

    onChangeEmail = (e)=>{
      this.setState({
        email: e.target.value
      })
    }

    onChangePassword = (e)=>{
      this.setState({
        password: e.target.value
      })
    }

    onChangeRetypePassword = (e)=>{
      this.setState({
        retypePassword: e.target.value
      })
    }

    onChangeRole = (e)=>{
      console.log(e.target.value)
      this.setState({
        role: e.target.value
      })
    }
    
    onSubmit = async (e) =>{
       e.preventDefault();
       const user = {
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        type: this.state.type
       }
       this.setState({
        password:'',
        retypePassword:''
      })
       if(this.state.editing){
          let route = Ip.getHost()+"/api/users-update"+"/"+this.state._id;
          var res = await axios.put(route,user);
          res = res.data;
          if(res){
            window.location.assign("/admin-user-all");
          }
       }else{
          let route = Ip.getHost()+"/api/users-register";
          var res = await axios.post(route,user);
          res = res.data;
          if(res>0){
            alert(`Usuario ${res} creado Exitosamente`);
            window.location.href="/admin-user-all"
          }else{
            alert(`Usuario no registrado! Intente nuevamente`);
          }
       }
    }
    getContent(){
        var title ="";
        var subtitle = "";
        var roleList = <select className="form-control" onChange={this.onChangeRole} value={this.state.role}>
                         {this.getRolList()}
                       </select>;
        if(this.state.editing){
          if(this.state.type){
            roleList = <h5>Client</h5>;
          }
          title = "Editar Usuario";
          subtitle = "Modificar Usuario"
          
        }else{
          title = "Registrar Usuario";
          subtitle = "Registrar nuevo usuario";
        }
        return (
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <ContentHeader title={title}></ContentHeader>
            {/* Main content */}
            <div
              className="card card-outline card-success"
              id="cardContentMain"
            >
              <div className="card-header">
                <h4 className="card-title text-green text-bold">
                  {subtitle}
                </h4>
                <div class="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="card" id="card_middle">
                  <div className="card-header text-center">
                    <h4 className="text-green" />
                  </div>
                  <div className="card-block">
                    <form onSubmit={this.onSubmit} id="formRegister">
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Username
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="homer"
                            name="username"
                            required
                            value={this.state.userName}
                            onChange={this.onChangeUsername}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="homer@gmail.com"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Contraseña
                        </label>
                        <div className="col-sm-10">
                          {this.inputPassword()}
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Repetir contraseña
                        </label>
                        <div className="col-sm-10">
                          {this.inputRetypePassword()}
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Rol
                        </label>
                        <div className="col-sm-10">
                          {roleList}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2" />
                        <div className="col-sm-6">
                            <button type="submit" className="btn btn-block btn-outline-success"><h5 className="text-bold">Submit</h5></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );     
    }

    inputRetypePassword(){
      if(this.state.editing){
        return <input type="password" className="form-control" placeholder="Escriba Aqui su nueva contraseña, caso contrario dejar en blanco" id="pass" value={this.state.retypePassword} onChange={this.onChangeRetypePassword}/>;
      }
      return <input type="password" className="form-control" placeholder="m1y2p3a5s4s.Net" required id="pass" value={this.state.retypePassword} onChange={this.onChangeRetypePassword}/>;
    }

    inputPassword(){
      if(this.state.editing){
        return (<input type="password" className="form-control" placeholder="Escriba Aqui su nueva contraseña, caso contrario dejar en blanco" id="pass" value={this.state.password} onChange={this.onChangePassword}/>);
      }
      return (<input type="password" className="form-control" placeholder="m1y2p3a5s4s.Net" required id="pass" value={this.state.password} onChange={this.onChangePassword}/>);
    }

    

}
