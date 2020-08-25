import React, { Component } from 'react'
import axios from 'axios'

import Header from '../../../partials/admin/Header';
import Menu from '../../../partials/admin/Menu';
import Footer from '../../../partials/admin/Footer';
import ContentHeader from '../../../partials/admin/ContentHeader';
import Ip from '../../../preferences/Ip';


export default class RoleAdd extends Component {
    
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
        privilegeList:[],
        roleName: '',
        description: '',
        editing: false,
        _id: '',
        privileges:[]
    }
    async componentDidMount(){
        console.log(this.props.match.params);
        let route = Ip.getHost() +"/api/role-privilege-list";
        var res = await axios.get(route);
        //let privilegeDefault = this.state.privileges.push(res.data.rows[0].id_privilege);
        this.setState({
          privilegeList : res.data,
          //privileges: privilegeDefault
        });

        if(this.props.match.params.id){
          console.log("Update");
          route = Ip.getHost() +"/api/role-edit"+"/"+this.props.match.params.id;
          var data = await axios.get(route);
          console.log(data);
          console.log(data.data);
          let roleData = data.data.roleData;
          var privilegesSelected = data.data.privilegesList;
          this.setState({
            roleName: roleData.role_name,
            description: roleData.description,
            privileges: privilegesSelected,
            editing: true,
            _id: this.props.match.params.id
          });
          //document.getElementById("pass").setAttribute("required","");
        }else{
          console.log("Register")
        }
    }

    getPrivilegeList(){
        return this.state.privilegeList.map(privilege=>{
          return(
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id = {privilege.id_privilege} value={privilege.id_privilege} onChange={this.onChangeCheck}/>
              <label className="form-check-label">{privilege.description_privilege}</label>
            </div>
          );
        })
    }
    
    onChangeRolename = (e)=>{
      this.setState({
        roleName: e.target.value
      })
    }

    onChangeDescription = (e)=>{
      this.setState({
        description: e.target.value
      })
    }

    onChangePrivilege = (e)=>{
        console.log("Entro a privilegios");
        console.log(e.target.value)
        this.setState({
          privileges: e.target.value
        })
    }
    
    onChangeCheck = (e)=>{
      let idPrivilege = e.target.value;
      console.log(idPrivilege);
      var isChecked = document.getElementById(idPrivilege).checked;
      if(isChecked){
        console.log("Check "+ idPrivilege +" is checked");
        let arr = this.state.privileges.concat(idPrivilege);
        this.setState({
          privileges: arr
        });
      }else{
        console.log("Check "+ idPrivilege +" is Unchecked");
        let indexEle= this.state.privileges.findIndex((element) => element == idPrivilege);
        let lastRemoved = this.state.privileges;
        lastRemoved = lastRemoved.splice(indexEle,1);
        this.setState({
          lastRemoved
        });
      }
    }

    
    
    onSubmit = async (e) =>{
       e.preventDefault();
       const role = {
        roleName: this.state.roleName,
        description: this.state.description,
        privileges: this.state.privileges
       }
       
       if(this.state.editing){
          let route = Ip.getHost()+"/api/role-edit"+"/"+this.state._id;
          var res = await axios.put(route,role);
          res = res.data;
          if(res){
            alert(`Rol ${this.state._id} actualizado Exitosamente`);
            window.location.href="/admin-user-role";
          }else{
            alert(`Rol ${this.state._id} no actualizado! Intente nuevamente`);
          }
       }else{
          let route = Ip.getHost()+"/api/role-register";
          var res = await axios.post(route,role);
          res = res.data;
          if(res>0){
            alert(`Rol ${res} creado Exitosamente`);
            window.location.href="/admin-user-role";
          }else{
            alert(`Rol no registrado! Intente nuevamente`);
          }
       }
    }
    getContent(){
        var title ="";
        var subtitle = "";
        if(this.state.editing){
          title = "Editar Rol";
          subtitle = "Modificar Rol"
        }else{
          title = "Registrar Rol";
          subtitle = "Registrar nuevo Rol";
        }
        return (
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <ContentHeader title={title}></ContentHeader>
            {/* Main content */}
            <div className="card card-outline card-success" id="cardContentMain">
              <div className="card-header">
                <h4 className="card-title text-green text-bold">
                  {subtitle}
                </h4>
                <div class="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
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
                          Nombre
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="homer"
                            name="username"
                            required
                            value={this.state.roleName}
                            onChange={this.onChangeRolename}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Descripcion:
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Administrador del e-commerce"
                            name="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                          />
                        </div>
                      </div>
                      <div className="form-group has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Privilegio
                        </label>
                        <div className= "justify-content-center">
                          {this.getPrivilegeList()}
                          {this.state.privileges.forEach(element => {
                            document.getElementById(element).checked=true;
                            })
                          }
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

    
}
