import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Header from "../partials/client/Header";
import AsideRigth from "../partials/client/AsideRigth";
import Footer from "../partials/client/Footer";
import {PRODUCT_LIST} from '../config/Const';

export default class Home extends Component {
    
    render() {
        document.getElementById("body").className = "hold-transition layout-top-nav";
        return (
            <div>
                <Header></Header>
                <div className="content-wrapper">
                    <section >
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active" id ="carousel-item">
                                <img className="d-block w-100 h-100" src="images/wood4.jpg" alt="First slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1 className="tex-bold">CALIDAD Y ELEGANCIA</h1>
                                    <p>Satisfacemos Requerimientos y Tendencias Globales</p>
                                    <Link to="/products" className="btn btn-success">Ver Productos</Link>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src="images/wood3.jpg" alt="Second slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1 className="tex-bold">LA EXPERIENCIA DEL DISEÑO</h1>
                                    <p>Fabricamos Nuestros Propios Muebles</p>
                                    <Link to="/products" className="btn btn-success">Ver Productos</Link>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="images/wood5.jpg" alt="Third slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1 className="tex-bold">NUEVAS CATEGORIAS!</h1>
                                    <p>Todo lo que Necesitas para la Cocina</p>
                                    <Link to="/products" className="btn btn-success">Ver Productos</Link>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                        </div>
                    </section>
                </div>
                <AsideRigth></AsideRigth>
                <Footer></Footer>

            </div>
        )
    }

    state={
        carrito:this.getCarrito()
    }

    getCarrito(){
        if(!localStorage.getItem(PRODUCT_LIST)){
            var list=[];
            localStorage.setItem(PRODUCT_LIST, JSON.stringify(list));
        }
        return JSON.parse(localStorage.getItem(PRODUCT_LIST));
    }
}
