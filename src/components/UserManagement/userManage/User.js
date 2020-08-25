import React, { Component } from 'react'
import axios from 'axios';

import Ip from '../../../preferences/Ip';

import Header from '../../../partials/admin/Header'
import Menu from '../../../partials/admin/Menu'
import Footer from '../../../partials/admin/Footer'
import ContentHeader from '../../../partials/admin/ContentHeader';
import { Link } from 'react-router-dom';

export default class User extends Component {
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
        userList:[]
    }
    async componentDidMount(){
        await this.getListUsers();
    }

    async getListUsers(){
      let route = Ip.getHost() +"/api/users-list";
      const res = await axios.get(route);
      this.setState({
        userList : res.data
      });
    }

    onSubmit= async ( id)=>{
      //e.preventDefault();
      let route = Ip.getHost()+"/api/users-status"+"/"+id;
      var res = await axios.put(route);
      if(res.data){
        alert("Se ha cambiado el estado del usuario exitosamente!");
      }else{
        alert("Hubo un error! Intente nuevamente");
      }
      await this.getListUsers();
   };

    getUserList(){
      return this.state.userList.map(user =>{
          let typeUser = <span className="badge bg-success" title="Cliente"><i class="fas fa-user"></i></span>;
          let stateUser = <button type="button" className="btn btn-sm btn-outline-success" title="Click para Deshabilitar" onClick={() => this.onSubmit(user.id_user)}><i className="fas fa-check"></i></button>;
          if(!user.type){    
            typeUser = <span className="badge bg-info" title="Administrador"><i class="fas fa-users-cog"></i></span>;
          }
          if(!user.enable){
            stateUser = <button type="button" className="btn btn-sm btn-outline-danger" title="Click para Habilitar" onClick={() => this.onSubmit(user.id_user)}><i class="fas fa-minus"></i></button>;
          }

          return(<tr key={user.id_user}>
              <td>{user.id_user}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{typeUser}</td>
              <td>{user.role_name}</td>
              <td>{stateUser}</td>
              <td>
                <Link className="btn btn-sm" to ={"/admin-user-edit" +"/"+user.id_user}>
                   <i class="far fa-edit" title="Editar"></i>
                </Link>
              </td>
          </tr>);
      })
    }

    getContent(){
       return (
         <div className="content-wrapper">
           
             {/* Content Header (Page header) */}
             <ContentHeader title="Usuarios"></ContentHeader>
             {/* Main content */}
             <div className="card card-outline card-success" id="cardContentMain">
               <div className="card-header">
                 <h4 className="card-title text-green text-bold">
                   Lista de Usuarios
                 </h4>
                 <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                  </button>
                </div>
               </div>
               <div className="card-body">
                 {/* /.box-header */}
                 <div className="box-body table-responsive no-padding">
                   <input
                     className="form-control mb-4"
                     id="tableSearch"
                     type="text"
                     placeholder="Type something to search list items"
                   />
                   <table className="table table-hover" id="table">
                     <caption>Total: 15</caption>
                     <thead>
                       <tr>
                         <th>#</th>
                         <th>UserName</th>
                         <th>Email</th>
                         <th>Tipo</th>
                         <th>Rol</th>
                         <th>Estado</th>
                         <th>Acciones</th>
                       </tr>
                     </thead>
                     <tbody id="myTable">
                        {this.getUserList()}
                      </tbody>
                   </table>
                 </div>
                 {/* /.box-body */}
               </div>
             </div>

             {/* /.content */}
           
         </div>
       );
    }
    
}
