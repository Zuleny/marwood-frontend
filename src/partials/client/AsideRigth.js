import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {PRODUCT_LIST} from '../../config/Const'


export default class AsideRigth extends Component {
  
  render() {
    return (
      <aside className="control-sidebar control-sidebar-dark" id="shop_cart">
        {/* Control sidebar content goes here */}
        <div className="p-3">
          <h5 className="text-bold">Carrito</h5>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
              {this.getListProducts()}
            </ul>
          </nav>
        </div>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-outline-success ml-5" to="/shopping-cart">
              Ver Carrito  <i class="fas fa-shopping-cart"></i>
          </Link>
        </div>;
      </aside>
    );
  }

  getListProducts(){
    var list = JSON.parse(localStorage.getItem(PRODUCT_LIST));
    if(list){
      return list.map(ele =>{
        return(
          <li className="nav-item" key={ele.cod_product}>
            <a href="#" className="nav-link">
              <h5 class="text-white">{ele.product_name}</h5>
              <div className="d-flex justify-content-center">
                  <p>{ele.quantity} unit.</p>
                  <p> x Bs. {ele.price}</p>
              </div>

            </a>
          </li>
        ) 
      }
      )
      
    }else{
      return <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p className="text-white">No hay Products Aún</p>
          </a>
      </li>
    }
    
  }
}
