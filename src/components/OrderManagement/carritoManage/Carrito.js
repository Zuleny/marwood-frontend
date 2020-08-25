import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {PRODUCT_LIST} from '../../../config/Const'
import Header from "../../../partials/client/Header";
import AsideRigth from "../../../partials/client/AsideRigth";
import Footer from "../../../partials/client/Footer";



export default class Carrito extends Component {
    state={
        carrito:JSON.parse(localStorage.getItem(PRODUCT_LIST))
    }
    

    getQuantityStates(){
        var list = JSON.parse(localStorage.getItem(PRODUCT_LIST));
        let arr = [];
        if(list){
            list.forEach(element => {
                arr.push(element.quantity);
            });
        }
        return arr;
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
        var button = <div className="d-flex justify-content-end">
        <Link className="btn btn-success ml-5" to="/order">
            CHECKOUT  <i class="fas fa-arrow-right"></i>
        </Link>
        </div>;
        if(this.state.carrito.length<1){
            button = <div className="d-flex justify-content-center">
                <Link className="btn btn-success ml-5" to="/products">
                    IR A COMPRAR  <i class="fas fa-shopping-cart"></i>
                </Link>
            </div>;
        }
        return (
            <div className="content-wrapper">
                <section className="content">
                    {this.getMenu()}
                    <div className="card-body">
                 {/* /.box-header */}
                    <div className="box-body table-responsive no-padding">
                        <input className="form-control mb-4"
                            id="tableSearch"
                            type="text"
                            placeholder="Type something to search list items"/>
                        <table className="table table-hover" id="table">
                            
                            <thead>
                            <tr>
                                <th></th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.getCarritoContent()}
                            </tbody>
                        </table>
                    </div>
                 {/* /.box-body */}
                {button}

                    
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
                        <li className="nav-item active">
                            <Link className="nav-link text-bold" to="/shopping-cart">SHOPPING CART  <i class="fas fa-arrow-right"></i><span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-bold" to="/order">CHECK OUT  <i class="fas fa-arrow-right"></i></Link>
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
        if(this.state.carrito.length>0){
            return this.state.carrito.map(ele =>{
                return(
                    <tr>
                        <td>
                            
                        </td>
                        <td>{ele.product_name}</td>
                        <td>{ele.price}</td>
                        <td>
                            {ele.quantity}
                        </td>
                        <td>{ele.price*ele.quantity}</td>
                        
                        <td>
                            <button className="btn btn-sm btn-outline-success" type="button" onClick={()=>this.onClickDelete(ele.cod_product)}>
                                <i class="fas fa-times"></i>
                            </button>
                        </td>
                    </tr>
                )
                
            }
            )
        }

        return (<tr>No hay productos aún<Link to="/products"></Link></tr>);
    }

    onClickDelete = (codProduct) =>{
        var arr = this.state.carrito.filter(element=>element.cod_product!==codProduct);
        localStorage.setItem(PRODUCT_LIST,JSON.stringify(arr));
        this.setState({
            carrito:arr
        })
    }

    
}
