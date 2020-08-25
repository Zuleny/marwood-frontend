import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {CLIENT_DATA, PRODUCT_LIST} from '../../config/Const';

export default class Navigation extends Component {
  render() {
    var element =<Link className="nav-link" to="/login" >Log in    <i className="far fa-user-circle"></i></Link>;
    var session = localStorage.getItem(CLIENT_DATA);
    session = JSON.parse(session);
    if(session){
      element = <li className="nav-item dropdown">
      <a
        id="dropdownSubMenu1"
        href="#"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className="nav-link dropdown-toggle"
      >
        {session.username}<i className="far fa-user-circle"></i>
      </a>
      <ul
        aria-labelledby="dropdownSubMenu1"
        className="dropdown-menu border-0 shadow"
      >
        <li>
          <a href="#" className="dropdown-item">
            Pedidos
          </a>
        </li>
        <li>
          <a href="#" className="dropdown-item">
            Detalles de la Cuenta
          </a>
        </li>
        <li>
          <Link to="/logout" className="dropdown-item">
            LOGOUT
          </Link>
        </li>
      </ul>
    </li>;
    }                
    return (
      <nav className="main-header navbar navbar-expand-md navbar-dark bg-dark navbar-white">
        <div className="container">
          <a href="../../index3.html" className="navbar-brand">
            <img
              src="../../dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">MarWood</span>
          </a>
          <button
            className="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse order-3" id="navbarCollapse">
            {/* Left navbar links */}
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <h5>INICIO</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                <h5>NOSOTROS</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Products" className="nav-link">
                <h5>CATÁLOGO</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                <h5>CONTACTO</h5>
                </Link>
              </li>
            </ul>
            {/* SEARCH FORM */}
            <form className="form-inline ml-0 ml-md-3">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Right navbar links */}
          <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li className="nav-item">
            {element}
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <i className="fas fa-shopping-cart"></i>
                <span class="badge badge-success navbar-badge text-bold">{this.getQuantityProducts()}</span>
                
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  getQuantityProducts(){
    var listProducts= JSON.parse(localStorage.getItem(PRODUCT_LIST));
    var quantity =0;
    listProducts.forEach(element => {
      quantity= quantity+element.quantity
    });
    return quantity;
  }

  
}
