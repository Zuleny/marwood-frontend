import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Ip from '../../../preferences/Ip'
import {PRODUCT_LIST, CLIENT_DATA} from '../../../config/Const'
import Header from "../../../partials/client/Header";
import AsideRigth from "../../../partials/client/AsideRigth";
import Footer from "../../../partials/client/Footer";

export default class Shipping extends Component {
    state={
        coupon:0,
        shop_cart:this.getShopCart(),
        nameClient:'',
        phoneNumber:'',
        email:'',
        department:'Santa Cruz',
        address:'',
        bussinesName:'',
        nitCi: 1,
        deliveryArea:0,
        listDeliveryArea:[],
        listPaymentMethod:[],
        paymentMethod:0
    }

    async componentDidMount(){
      await this.getDataDeliveryArea();
      await this.getDataPaymentMethod();

    }

    async getDataDeliveryArea(){
      let route = Ip.getHost() +"/api/deliveryArea-list";
      var res = await axios.get(route);
      this.setState({
        listDeliveryArea : res.data,
        deliveryArea: res.data[0].id
      });
    }

    async getDataPaymentMethod(){
      let route = Ip.getHost() +"/api/paymentMethod-list";
      var res = await axios.get(route);
      this.setState({
        listPaymentMethod : res.data,
        paymentMethod: res.data[0].id_payment_method
      });
    }

    getShopCart(){
        if(!localStorage.getItem(PRODUCT_LIST)){
            var list=[];
            localStorage.setItem(PRODUCT_LIST, JSON.stringify(list));
        }
        return JSON.parse(localStorage.getItem(PRODUCT_LIST));
    }

    

    render() {
        document.getElementById("body").className = "hold-transition layout-top-nav";
        return (
            <div>
                <Header></Header>
                {this.getContent()}
                <AsideRigth></AsideRigth>
                <Footer></Footer>
            </div>
        )
    }

    getContent(){
        
        return (
            <div className="content-wrapper">
                <section className="content">
                    {this.getMenu()}
                    <div className="card-body">
                 {/* /.box-header */}
                        <div className="box-body table-responsive no-padding">
                            <label className="text-bold text-gray text-center">Tu Pedido</label>
                            <table className="table table-hover" id="table">
                                
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.getCarritoContent()}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                              Total: {this.getTotalShoppingCart()}
                            </div>;
                        </div>
                 {/* /.box-body */}
                        
                    </div>
                    <div className="card-body">
                        {this.getForm()}
                    </div>
                </section>
            </div>
            );
    }

    getMenu(){
        return <div className="content" id="content-shopping">
            <br></br><br></br>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto m-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-bold" to="/shopping-cart">SHOPPING CART  <i class="fas fa-arrow-right"></i><span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-bold" href="#">CHECK OUT  <i class="fas fa-arrow-right"></i></a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link text-bold" href="#">ORDER COMPLETE</a>
                        </li>
                        </ul>
                        
                    </div>
            </nav>

            
        </div>;

    }

    getCarritoContent(){
        if(this.state.shop_cart.length>0){
            return this.state.shop_cart.map(ele =>{
                return(
                    <tr>
                        <td>{ele.product_name}</td>
                        <td>{ele.price}</td>
                        <td>
                            {ele.quantity}
                        </td>
                        <td>{ele.price*ele.quantity}</td>
                    </tr>
                )
                
            }
            )
        }

        return (<tr>No hay productos aún<Link to="/products"></Link></tr>);
    }

    getForm(){
      var button = <div className="d-flex justify-content-end">
        <button className="btn btn-success ml-5">
            ORDER COMPLETE  <i class="fas fa-arrow-right"></i>
        </button>
        </div>;
        if(this.state.shop_cart.length<1){
            button = <div className="d-flex justify-content-center">
                <Link className="btn btn-success ml-5" to="/products">
                    IR A COMPRAR  <i class="fas fa-shopping-cart"></i>
                </Link>
            </div>;
        }

        return(
            <div className="card" id="card_middle">
                  <div className="card-header text-center">
                    <h4 className="text-gray text-bold" >Facturación y Envio</h4>
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
                            value={this.state.nameClient}
                            onChange={this.onChangeName}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Telefono
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="76628723"
                            required
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhone}
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
                          Departamento
                        </label>
                        <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Santa Cruz"
                              required
                              value={this.state.department}
                              onChange={this.onChangeDepartment}
                            />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Direccion
                        </label>
                        <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Avenda Siempre Vivas #123"
                            required
                            value={this.state.address}
                            onChange={this.onChangeAdrress}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Razon Social
                        </label>
                        <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Tienda dedicada al comercio de articulos para el hogar"
                              required
                              value={this.state.bussinesName}
                              onChange={this.onChangeBussinesName}
                            />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Nit/Ci
                        </label>
                        <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="123456789"
                              required
                              value={this.state.nitCi}
                              onChange={this.onChangeNitCi}
                            />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          ¿Tiene un Cupon de Descuento?
                        </label>
                        <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Código de Cupón"
                              value={this.state.coupon}
                              onChange={this.onChangeCoupon}
                            />
                        </div>
                      </div>
                    
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Zona Delivery
                        </label>
                        <div className="col-sm-10">
                          <select className="form-control" onChange={this.onChangeDeliveryArea} value={this.state.deliveryArea}>
                            {this.getDeliveryArea()}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Método de Pago
                        </label>
                        <div className="col-sm-10">
                          <select className="form-control" onChange={this.onChangePaymentMethod} value={this.state.paymentMethod}>
                            {this.getPaymentMethod()}
                          </select>
                        </div>
                      </div>

                      {button}

                      
                    </form>
                  </div>
                </div>

        );
    }

    onSubmit = async (e) =>{
      e.preventDefault();
      let idUser = JSON.parse(localStorage.getItem(CLIENT_DATA));
      idUser = idUser.id_user;
      const order = {
        totalShoppingCart: this.getTotalShoppingCart(),
        idUser: idUser,
        codCupon: this.state.coupon,
        idPaymentMethod: this.state.paymentMethod,
        nameClient: this.state.nameClient,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        departament: this.state.department,
        address: this.state.address,
        businessName: this.state.bussinesName,
        nitCi: this.state.nitCi,
        idDeliveryArea: this.state.deliveryArea,
        shoppingCart: this.state.shop_cart,
      }
      let route = Ip.getHost()+"/api/order-register"
      var res = await axios.post(route, order);
      res = res.data;
      if(res>0){
        alert(`Usuario ${res} creado Exitosamente`);
        window.location.href="/login"
      }else{
        alert(`Usuario no registrado! Intente nuevamente`);
      }
      

    }

    getTotalShoppingCart(){
      var total = 0;
      this.state.shop_cart.forEach(element => {
        total = total + element.price*element.quantity
      });
      return total
    }

    onChangeCoupon = (e)=>{
      this.setState({
        coupon: e.target.value
      })
    }

    onChangeName = (e)=>{
      this.setState({
        nameClient: e.target.value
      })
    }

    onChangePhone = (e)=>{
      this.setState({
        phoneNumber: e.target.value
      })
    }

    onChangeEmail = (e)=>{
      this.setState({
        email: e.target.value
      })
    }

    onChangeDepartment = (e)=>{
      this.setState({
        department: e.target.value
      })
    }

    onChangeAdrress = (e)=>{
      this.setState({
        address: e.target.value
      })
    }

    onChangeBussinesName = (e)=>{
      this.setState({
        bussinesName: e.target.value
      })
    }

    onChangeNitCi = (e)=>{
      this.setState({
        nitCi: e.target.value
      })
    }

    onChangeDeliveryArea = (e)=>{
      this.setState({
        deliveryArea: e.target.value
      })
    }

    onChangePaymentMethod = (e)=>{
      this.setState({
        paymentMethod: e.target.value
      })
    }

    getDeliveryArea(){
      return this.state.listDeliveryArea.map(area=>{
        return(
        <option value={area.id}>{area.country+", "+area.departament+", "+area.province+"  (Bs "+area.price_delivery_area+")"}</option>
        );
      })
    }

    getPaymentMethod(){
      return this.state.listPaymentMethod.map(ele=>{
        return(
        <option value={ele.id_payment_method}>{ele.name}</option>
        );
      })
    }
}
