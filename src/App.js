import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";



import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/UserManagement/userManage/SignUp";
import Product from "./components/CatalogInventoryManagement/productManage/Product";
import Products from "./components/CatalogInventoryManagement/productManage/Products";

import Warehouse from './components/CatalogInventoryManagement/warehouseManage/Warehouse'
import Logout from './components/Logout';
import LogoutAdmin from './components/LogoutAdmin';

import Contact from "./components/Contact";

import Index from "./components/Index"
import User from "./components/UserManagement/userManage/User";
import SignUpAdmin from "./components/UserManagement/userManage/SignupAdmin";

import Role from './components/UserManagement/roleManage/Role';
import RoleAdd from "./components/UserManagement/roleManage/RoleAdd";
import ProductsCategory from "./components/CatalogInventoryManagement/productManage/ProductsCategory";
import ProductsAdmin from "./components/CatalogInventoryManagement/productManage/ProductsAdmin";
import ProductAdd from "./components/CatalogInventoryManagement/productManage/ProductAdd";
import Carrito from "./components/OrderManagement/carritoManage/Carrito";
import SalesReport from "./components/OrderManagement/orderManage/SalesReport";
import SaleReportDate from "./components/OrderManagement/orderManage/SaleReportDate";
import Shipping from "./components/OrderManagement/shippingManage/Shipping";
import Order from "./components/OrderManagement/orderManage/Order";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Route path="/" exact component={Home} ></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/logout" exact component={Logout}></Route>
        <Route path="/logout-admin" exact component={LogoutAdmin}></Route>
        <Route path="/signup" exact component={SignUp}></Route>  

        <Route path="/product/:id" exact component={Product}></Route>

        <Route path="/products" exact component={Products}></Route>
        <Route path="/product-category/:id" exact component={ProductsCategory}></Route>
        <Route path="/contact" exact component={Contact}></Route>
        <Route path="/shopping-cart" exact component={Carrito}></Route>
        <Route path="/order" exact component={Shipping}></Route>
        <Route path="/admin" exact component={Index}></Route>
        <Route path="/admin-user-all" exact component={User}></Route>
        <Route path="/admin-user-signup" exact component={SignUpAdmin}></Route>
        <Route path="/admin-user-edit/:id" exact component={SignUpAdmin}></Route>
        <Route path="/admin-user-role" exact component={Role}></Route>
        <Route path="/admin-user-role-add" exact component={RoleAdd}></Route>
        <Route path="/admin-user-role-edit/:id" exact component={RoleAdd}></Route>
        <Route path="/admin-product-all" exact component={ProductsAdmin}></Route>
        <Route path="/admin-product-add" exact component={ProductAdd}></Route>
        <Route path="/admin-product-edit/:id" exact component={ProductAdd}></Route>
        <Route path="/admin-order_list" exact component={Order}></Route>
        <Route path="/admin-sales_report" exact component={SalesReport}></Route>
        <Route path="/admin-sales_date_report" exact component={SaleReportDate}></Route>
      </Router>
    </div>
  );
  
}

export default App;
