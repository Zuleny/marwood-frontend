import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Ip from '../../../preferences/Ip'
import {PRODUCT_LIST, CLIENT_DATA} from '../../../config/Const'
import Header from "../../../partials/client/Header";
import AsideRigth from "../../../partials/client/AsideRigth";
import Footer from "../../../partials/client/Footer";

export default class OrderComplete extends Component {
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
                    <div className="container">
                        <div className="jumbotron">
                            <h1 className="display-4">COMPRA REALIZADA EXITOSAMENTE! CODIGO DE PEDIDO: {this.props.match.params.id}</h1>
                            <p className="lead">Gracias Por su Preferencia</p>
                            <hr className="my-4" />
                            <p className="lead">
                                <Link className="btn btn-success" to="/products" role="button">Seguir Comprando</Link>
                            </p>
                        </div>
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
                            <Link className="nav-link text-bold disabled" to="#/">SHOPPING CART  <i class="fas fa-arrow-right"></i><span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-bold disabled" href="#">CHECK OUT  <i class="fas fa-arrow-right"></i></a>
                        </li>
                        
                        <li className="nav-item active">
                            <Link className="nav-link text-bold" to="#">ORDER COMPLETE</Link>
                        </li>
                        </ul>
                        
                    </div>
            </nav>

            
        </div>;

    }
}
