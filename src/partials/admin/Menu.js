import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class Menu extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/admin" className="brand-link">
          <img
            src="../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">MarWood</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="../dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Alexander Pierce
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
              <li className="nav-header">USUARIOS</li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-circle" />
                  <p>
                     Gestionar Usuario
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-user-all">
                      <i className="far fa-circle nav-icon" />
                      <p>Todos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-user-signup" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Registrar
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Actividades</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-circle" />
                  <p>
                     Gestionar Rol
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-user-role">
                      <i className="far fa-circle nav-icon" />
                      <p>Todos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-user-role-add" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Registrar
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Gestionar Privilegio</p>
                </a>
              </li>

              <li className="nav-header">CATALOGO</li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-circle" />
                  <p>
                     Gestionar Producto
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admin-product-all" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Todos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-product-add" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Registrar
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Gestionar Categoria</p>
                </a>
              </li>
              
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Gestionar Almacen</p>
                </a>
              </li>

              <li className="nav-header">PEDIDOS</li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-circle" />
                  <p>
                     Gestionar Pedido
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admin-order_list" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Todos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Reportes
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/admin-sales_report" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Reportes de Ventas</p>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/admin-sales_date_report" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Reporte De Pedidos</p>
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Gestionar Zonas de Entrega</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
