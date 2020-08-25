import React, { Component } from 'react'

import axios from 'axios'

import {PRODUCT_LIST} from '../../../config/Const'
import Ip from '../../../preferences/Ip'
import Header from "../../../partials/client/Header";
import AsideRigth from "../../../partials/client/AsideRigth";
import Footer from "../../../partials/client/Footer";
import { Link } from 'react-router-dom';
let container;
export default class Product extends Component {
    state={
        productData:[],
        listImages:[],
        quantity:1,
        shop_cart:this.getShopCart()
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

    async componentDidMount(){
        var id_product = this.props.match.params.id;

        if(this.props.match.params.id){
            let route = Ip.getHost()+"/api/product-edit"+"/"+this.props.match.params.id;
            let response = await axios.get(route);
            console.log("Data Product List: "+response.data.productData);
            this.setState({
                productData: response.data.productData,
                listImages: response.data.imagesProduct
            });
            
        }
    }

    getContent(){
        let availability=<span className="badge bg-success"><i class="fas fa-check"></i></span>;
        if(!this.state.productData.availability){
            availability = <span className="badge bg-success"><i class="fas fa-minus"></i></span>;
        }
        return (
            <div className="content-wrapper">
                <section className="content">
                    
                    <div className="container">
                         <div className="row">
                            <div className="col-md-8">
                                <div className="card" id="card-single-product">
                                    <div className="card-body">
                                        <Link>
                                        <img src="../wood2.jpg" alt="" className="w-100 h-100 img-thumbnail" id="main-image-product"/>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <img src="../wood1.jpg" alt="..." class="w-25 h-25 img-thumbnail"/>
                                        <img src="../wood2.jpg" alt="..." class="w-25 h-25 img-thumbnail"/>
                                        <img src="../wood1.jpg" alt="..." class="w-25 h-25 img-thumbnail"/>
                                        <img src="../wood2.jpg" alt="..." class="w-25 h-25 img-thumbnail"/>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="container mt-5">
                                    <h3 className=" text-bold text-green">{this.state.productData.name}</h3>
                                    <h4 className="text-bold text-purple"> Bs. {this.state.productData.price}</h4>
                                    <p className="text-gray">
                                        {this.state.productData.description}
                                    </p>
                                    <p className="text-gray">Medidas: {this.state.productData.measure}</p>
                                    <p className="text-gray">Material: {this.state.productData.material}</p>
                                    <p className="text-gray">Color: {this.state.productData.wood_color}</p>
                                    <p className="text-gray">Disponibilidad:  {availability}</p>
                                    <div className="input-group">
                                        <input className="w-25" type="number" value={this.state.quantity} min="1" onChange={this.onChangeQuantity}></input>
                                        <button type="button" className="btn btn-success ml-2 toastsDefaultSuccess" onClick={() => this.onClick(this.state.productData.name,this.state.productData.cod_product, this.state.productData.id_category,this.state.productData.price,this.state.quantity)}>
                                            Añadir al Carrito<i class="fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            </div>
                    </div>
                </section>
            </div>
            );
    }
    onChangeQuantity = (e)=>{
        this.setState({
          quantity: e.target.value
        })
    }

    onClick = (productName, codProduct, idCategory,price_i,quantity)=>{
        quantity = parseInt(quantity);
        var list = this.state.shop_cart;
        var existeProduct = false;
        list.forEach(element => {
            if(element.cod_product==codProduct){
                console.log("Producto ya existe, se procede a actualizar! "+(element.quantity+ quantity));
                element.quantity = element.quantity+ quantity;
                existeProduct = true;
            }
        });

        if(existeProduct){
            localStorage.setItem(PRODUCT_LIST,JSON.stringify(list));
            this.setState({
                shop_cart:list
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
                shop_cart: newlist
            })
        }
        
        
    }
}
