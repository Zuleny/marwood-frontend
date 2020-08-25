import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'

import {PRODUCT_LIST} from '../../../config/Const'
import Ip from '../../../preferences/Ip'
import Header from "../../../partials/client/Header";
import CategoryMenu from "../../../partials/client/CategoryMenu";
import AsideRigth from "../../../partials/client/AsideRigth";
import Footer from "../../../partials/client/Footer";

export default class Products extends Component {
    state={
        listProducts:[],
        listImages:[],
        carrito:this.getCarrito()
    }

    getCarrito(){
        if(!localStorage.getItem(PRODUCT_LIST)){
            var list=[];
            localStorage.setItem(PRODUCT_LIST, JSON.stringify(list));
        }
        return JSON.parse(localStorage.getItem(PRODUCT_LIST));
    }

    async componentDidMount(){
        await this.getProductList();
    }

    async getProductList(){
        let route = Ip.getHost()+"/api/product-list";
        let response = await axios.get(route);
        this.setState({
            listProducts: response.data.productList,
            listImages: response.data.imagesList
        });
        
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
            <CategoryMenu title="CATEGORÍAS!"></CategoryMenu>
            <div className="content">
                <div className="container">
                    <div className="row">
                        {this.getProductCard()}
                    </div>
                   
                </div>

            </div>
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast-add-product">
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..." />
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>

        </div>
        );
    }

    getProductCard(){
        return this.state.listProducts.map(
            (product)=>{
                return(
                    <div className="col-md-4">
                        <div className="card" id="card-product">
                            <Link to={"/product"+"/"+product.cod_product}><img className="card-img-top" src="wood2.jpg" alt="Card image cap" id="image_product" /></Link>
                            <div className="card-body">
                                <Link to={"/product"+"/"+product.cod_product}><h5 className="text-olive text-bold text-center">{product.name}</h5></Link>
                                <p className="card-text text-gray text-center text-bold">Bs. {product.price}</p>
                                <button className="btn btn-block btn-outline-success btn-sm" type="button" onClick={() => this.onClick(product.name, product.cod_product, product.id_category,product.price, 1)}>Añadir al carrito <i class="fas fa-shopping-cart"></i></button>
                            </div>
                        </div>
                    </div>
                );
            }

        );
    }

    onClick = (productName, codProduct, idCategory,price_i,quantity)=>{
        var list = this.state.carrito;
        var existeProduct = false;
        list.forEach(element => {
            if(element.cod_product==codProduct){
                element.quantity = element.quantity+ quantity;
                console.log("Producto ya existe, se procede a actualizar!");
                existeProduct = true;
            }
        });

        if(existeProduct){
            localStorage.setItem(PRODUCT_LIST,JSON.stringify(list));
            this.setState({
                carrito:list
            })
        }else{
            var product = {
                product_name: productName,
                cod_product: codProduct,
                id_category: idCategory,
                price: price_i,
                quantity: 1
            }
            var newlist = list.concat(product);
            localStorage.setItem(PRODUCT_LIST,JSON.stringify(newlist));
            this.setState({
                carrito:newlist
            })
        }
        alert("Añadido al carrito exitosamente");

    }
}
