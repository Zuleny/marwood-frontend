import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Ip from '../../../preferences/Ip';

import Header from '../../../partials/admin/Header'
import Menu from '../../../partials/admin/Menu'
import Footer from '../../../partials/admin/Footer'
import ContentHeader from '../../../partials/admin/ContentHeader';


export default class ProductsAdmin extends Component {
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
        productList:[],
        imagesList:[]
    }
    async componentDidMount(){
        await this.getDataProductList();
    }

    async getDataProductList(){
      let route = Ip.getHost() +"/api/product-list";
      const res = await axios.get(route);
      this.setState({
        productList : res.data.productList,
        imagesList: res.data.imagesList
      });
    }

    onClick= async ( id)=>{
      //e.preventDefault();
      let route = Ip.getHost()+"/api/product-status"+"/"+id;
      var res = await axios.put(route);
      if(res.data){
        alert("Se ha cambiado el estado del producto exitosamente!");
      }else{
        alert("Hubo un error! Intente nuevamente");
      }
      await this.getDataProductList()
   };

    getProductList(){
      return this.state.productList.map(ele =>{
          
          let availability = <button type="button" className="btn btn-sm btn-outline-success" title="Click para Deshabilitar" onClick={() => this.onClick(ele.cod_product)}><i className="fas fa-check"></i></button>;
          if(!ele.availability){
            availability = <button type="button" className="btn btn-sm btn-outline-danger" title="Click para Habilitar" onClick={() => this.onClick(ele.cod_product)}><i class="fas fa-minus"></i></button>;
          }

          return(
          <tr key={ele.cod_product}>
              <td>{ele.cod_product}</td>
              <td>{ele.name}</td>
              <td>{ele.category_name}</td>
              <td>{ele.description}</td>
              <td>{ele.measure}</td>
              <td>{ele.material}</td>
              <td>{ele.wood_color}</td>
              <td>{ele.price}</td>
              <td>{availability}</td>
              <td>
                <Link className="btn btn-sm" to ={"/admin-product-edit" +"/"+ele.cod_product}>
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
             <ContentHeader title="Productos"></ContentHeader>
             {/* Main content */}
             <div className="card card-outline card-success" id="cardContentMain">
               <div className="card-header">
                 <h4 className="card-title text-green text-bold">
                   Lista de Productos
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
                         <th>Categoria</th>
                         <th>Descripcion</th>
                         <th>Medidas</th>
                         <th>Material</th>
                         <th>Color</th>
                         <th>Precio</th>
                         <th>Disponible</th>
                         <th>Acciones</th>
                       </tr>
                     </thead>
                     <tbody id="myTable">
                        {this.getProductList()}
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
