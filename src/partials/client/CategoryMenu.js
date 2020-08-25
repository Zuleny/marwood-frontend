import React, { Component } from 'react'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'

import Ip from '../../preferences/Ip';

export default class CategoryMenu extends Component {

    state={
        listCategories:[]
    }

    async componentDidMount(){
        await this.getCategoryList();
    }

    async getCategoryList(){
        let route = Ip.getHost()+"/api/category-list";
        let response = await axios.get(route);
        this.setState({
            listCategories: response.data
        });
        console.log(this.state.listCategories); 
    }

    render() {
        return (
            <div className="content" id="main-category">
                <h1 className="text-center text-white text-bold">{this.props.title}</h1>
                <nav className="navbar navbar-expand-md navbar-light bg-light">     
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                                {this.getCategories()}
                            </ul>
                        </div>
                    </div>            
                </nav>
            </div>
        )
    }

    getCategories(){
        return this.state.listCategories.map(
            (category)=>{
                let route = "/product-category"+"/"+category.id_category;
                return(
                    <li className="nav-item" key={category.id_category}>
                        <Link className="nav-link" to={route}>
                            <h5 className="text-gray text-bold">{category.name}  <span class="badge badge-info">  {category.get_quantity_product_of_a_category}</span></h5>
                        </Link>
                    </li>
                );

            }
        );
        
    }
}
