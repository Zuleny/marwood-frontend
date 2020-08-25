import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Ip from '../../../preferences/Ip';

import Header from '../../../partials/admin/Header';
import Menu from '../../../partials/admin/Menu';
import Footer from '../../../partials/admin/Footer';
import ContentHeader from '../../../partials/admin/ContentHeader';
export default class Role extends Component {
    render() {
        return (
            <div>
            <Header></Header>
            <Menu></Menu>
            {this.getContent()}
            <Footer></Footer>
          </div>
        )
    }

    state={
        roleList:[]
    }
    async componentDidMount(){
        await this.getListRoles();
    }

    async getListRoles(){
      let route = Ip.getHost() +"/api/role-list";
      const res = await axios.get(route);
      this.setState({
        roleList : res.data
      });
      console.log(this.state.roleList); 
    }

    onSubmit= async ( id)=>{
      let route = Ip.getHost()+"/api/role-status"+"/"+id;
      var res = await axios.put(route);
      if(res.data){
        alert("Se ha cambiado el estado del usuario exitosamente!");
      }else{
        alert("Hubo un error! Intente nuevamente");
      }
      await this.getListRoles();
   };

    getRoleList(){
      return this.state.roleList.map(ele =>{
          let percent = Math.round(ele.get_quantity_privileges);
          let value = percent +'%';
          let privilege = <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{width: value}} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                                {value}
                            </div>
                          </div>

          let stateUser = <button type="button" className="btn btn-sm btn-outline-success" title="Click para Deshabilitar" onClick={() => this.onSubmit(ele.id_role)}><i className="fas fa-check"></i></button>;
          
          if(!ele.enable){
            stateUser = <button type="button" className="btn btn-sm btn-outline-danger" title="Click para Habilitar" onClick={() => this.onSubmit(ele.id_role)}><i class="fas fa-minus"></i></button>;
          }

          return(<tr key={ele.id_role}>
              <td>{ele.id_role}</td>
              <td>{ele.role_name}</td>
              <td>{ele.description}</td>
              <td>{privilege}</td>
              <td>{stateUser}</td>
              <td>
                <Link className="btn btn-sm" to ={"/admin-user-role-edit" +"/"+ele.id_role}>
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
             <ContentHeader title="Roles"></ContentHeader>
             {/* Main content */}
             <div className="card card-outline card-success" id="cardContentMain">
               <div className="card-header">
                 <h4 className="card-title text-green text-bold">
                   Lista de Roles
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
                         <th>Nombre</th>
                         <th>Descripcion</th>
                         <th>Privilegio</th>
                         <th>Estado</th>
                         <th>Acciones</th>
                       </tr>
                     </thead>
                     <tbody id="myTable">
                        {this.getRoleList()}
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
