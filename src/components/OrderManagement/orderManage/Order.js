import React, { Component } from 'react'
import axios from 'axios';

import Ip from '../../../preferences/Ip';

import Header from '../../../partials/admin/Header'
import Menu from '../../../partials/admin/Menu'
import Footer from '../../../partials/admin/Footer'
import ContentHeader from '../../../partials/admin/ContentHeader';
import {ADMIN_DATA} from '../../../config/Const';

export default class Order extends Component {
    state={
        orderList: [],
        invoice_no: 0
    }
    async componentDidMount(){
        await this.getDataOrderList();
    }

    async getDataOrderList(){
      let route = Ip.getHost() +"/api/order-list";
      const res = await axios.get(route);
      this.setState({
        orderList : res.data
      });
    }
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

    onClick= async ( id)=>{
        //e.preventDefault();
        let route = Ip.getHost()+"/api/product-status"+"/"+id;
        var res = await axios.put(route);
        if(res.data){
          alert("Se ha cambiado el estado del producto exitosamente!");
        }else{
          alert("Hubo un error! Intente nuevamente");
        }
        await this.getDataOrderList();
    };

    async handlerButtonAction(orderNo){
      let data = JSON.parse(localStorage.getItem(ADMIN_DATA))
      const response = await axios.post(Ip.getHost()+"/api/generate_invoice_pdf",{
        order_no : orderNo,
        id_user : data.id_user
      });
      this.setState({
        invoice_no: response.data.invoice_no
      });
      alert(`La factura se registro correctamente, puede imprimir la factura #${response.data.invoice_no}`);
    }

    getProductList(){
        return this.state.orderList.map(ele =>{
            let option;
            if(ele.state==0){
                option = "Cancelado";
            }else{
                if(ele.state==1){
                    option = "Finalizado";
                }else{ //ele.state=2
                    option = "Espera";
                }
            }
            
            let discount = (ele.total_shopping_cart*ele.discount)/100;
            discount = discount.toFixed(2);
            let deliveryArea = parseInt(ele.price_delivery_area);
  
            return(
            <tr key={ele.nro_order}>
                <td>{ele.nro_order}</td>
                <td>{ele.date}</td>
                <td>{ele.username}</td>
                <td>{ele.name}</td>
                <td>{ele.total_shopping_cart}</td>
                <td>{discount}</td>
                <td>{(ele.total_shopping_cart-discount).toFixed(2)}</td>
                <td>{deliveryArea}</td>
                <td><span className="badge badge-success">{(ele.total_shopping_cart-discount+deliveryArea).toFixed(2)}</span></td>
                <td>
                    <select className="form-control" value={option}>
                        <option value="0">Cancelado</option>
                        <option value="1">Finalizado</option>
                        <option value="2">Espera</option>
                    </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-success" onClick={() => this.handlerButtonAction(ele.nro_order)}>
                    <i class="far fa-save" title="Ver Factura"></i>
                  </button>
                  <a type="button" className="btn btn-sm btn-primary" title="Imprimir Factura" href={`${Ip.getHost()}/pdf/${this.state.invoice_no}`}>
                    <i className="fa fa-file-pdf"></i>
                  </a>
                </td>
            </tr>);
        })
      }
  
      getContent(){
         return (
           <div className="content-wrapper">
             
               {/* Content Header (Page header) */}
               <ContentHeader title="Pedidos"></ContentHeader>
               {/* Main content */}
               <div className="card card-outline card-success" id="cardContentMain">
                 <div className="card-header">
                   <h4 className="card-title text-green text-bold">
                     Lista de Pedidos
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
                           <th>Fecha</th>
                           <th>Cliente</th>
                           <th>Método de Pago</th>
                           <th>Subtotal Productos</th>
                           <th>Descuento</th>
                           <th>Total Productos</th>
                           <th>Total Delivery</th>
                           <th>Total</th>
                           <th>Estado</th>
                           <th></th>
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
