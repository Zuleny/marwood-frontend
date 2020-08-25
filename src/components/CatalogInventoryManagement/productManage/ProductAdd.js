import React, { Component } from 'react'
import axios from 'axios';

import Ip from '../../../preferences/Ip';
import Header from '../../../partials/admin/Header'
import Menu from '../../../partials/admin/Menu'
import Footer from '../../../partials/admin/Footer'
import ContentHeader from '../../../partials/admin/ContentHeader';

export default class ProductAdd extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Menu></Menu>
                {this.getContent()}
                <Footer></Footer>
            </div>
        )
    }

    state={
        categoryList:[],
        productName: '',
        description: '',
        measure: '',
        material: '',
        woodColor: '',
        price: 10.0,
        imagesList:[],
        categorySelected: 0,
        editing: false,
        _id: ''
    }
    async componentDidMount(){
        
        await this.getDataCategoryList();

        if(this.props.match.params.id){ //update
          console.log("Update");
          await this.getDataProduct();
          //document.getElementById("pass").setAttribute("required","");
        }else{ //register
          console.log("Register")
        }
    }

    async getDataCategoryList(){
        let route = Ip.getHost() +"/api/category-list";
        var res = await axios.get(route);
        this.setState({
          categoryList : res.data,
          categorySelected: res.data[0].id_category
        });
    }

    async getDataProduct(){
        let route = Ip.getHost() +"/api/product-edit"+"/"+this.props.match.params.id;
        var response = await axios.get(route);
        response = response.data;
        let productData = response.productData;
        let imagesProduct = response.imagesProduct
        this.setState({
            categorySelected: productData.id_category,
            productName: productData.name,
            description: productData.description,
            measure: productData.measure,
            material: productData.material,
            woodColor: productData.wood_color,
            price: productData.price,
            imagesProduct: imagesProduct,
            editing: true,
            _id: this.props.match.params.id
        });
    }

    getCategoryList(){
        return this.state.categoryList.map(ele=>{
          return(
             <option value={ele.id_category}>{ele.name}</option>
          );
        })
    }
    
    onChangeProductName = (e)=>{
      this.setState({
        productName: e.target.value
      })
    }

    onChangeDescription = (e)=>{
      this.setState({
        description: e.target.value
      })
    }

    onChangeMeasure = (e)=>{
      this.setState({
        measure: e.target.value
      })
    }

    onChangeMaterial = (e)=>{
      this.setState({
        material: e.target.value
      })
    }

    onChangeWoodColor = (e)=>{
        this.setState({
          woodColor: e.target.value
        })
    }

    onChangePrice = (e)=>{
        this.setState({
          price: e.target.value
        })
    }

    onChangeCategory = (e)=>{
      console.log(e.target.value)
      this.setState({
        categorySelected: e.target.value
      })
    }

    onChangeListImages = (e)=>{
        let a = e.target.files[0];
        console.log("Last File: "+ a);
        let length = e.target.files.length;
        console.log("LEngth: "+ length);
        for (let index = 0; index < length; index++) {
            let arr = e.target.files[index];
            for (const prop in arr) {
                console.log(`obj.${prop} = ${arr[prop]}`);
            }
        }
    
    }
    
    onSubmit = async (e) =>{
       e.preventDefault();
       const product = {
        idCategory: this.state.categorySelected,   
        productName: this.state.productName,
        description: this.state.description,
        measure: this.state.measure,
        material: this.state.material,
        woodColor: this.state.woodColor,
        price: this.state.price,
        images: this.state.imagesList
       }
       
       if(this.state.editing){
          let route = Ip.getHost()+"'/api/product-edit"+"/"+this.state._id;
          var res = await axios.put(route,product);
          res = res.data;
          if(res){
            window.location.assign("/admin-product-all");
          }
       }else{
          let route = Ip.getHost()+"/api/product-register";
          var res = await axios.post(route,product);
          res = res.data;
          if(res>0){
            alert(`Producto ${res} creado Exitosamente`);
            window.location.href="/admin-product-all"
          }else{
            alert(`Producto no registrado! Intente nuevamente`);
          }
       }
    }
    getContent(){
        var title ="";
        var subtitle = "";
        var categoryList = <select className="form-control" onChange={this.onChangeCategory} value={this.state.categorySelected}>
                         {this.getCategoryList()}
                       </select>;
        if(this.state.editing){
          
          title = "Editar Producto";
          subtitle = "Modificar Producto"
          
        }else{
          title = "Registrar Producto";
          subtitle = "Registrar nuevo producto";
        }
        return (
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <ContentHeader title={title}></ContentHeader>
            {/* Main content */}
            <div className="card card-outline card-success" id="cardContentMain">
              <div className="card-header">
                <h4 className="card-title text-green text-bold">
                  {subtitle}
                </h4>
                <div class="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="card" id="card_middle">
                  <div className="card-header text-center">
                    <h4 className="text-green" />
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
                            placeholder="RoperoA25"
                            required
                            value={this.state.productName}
                            onChange={this.onChangeProductName}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                        Descripcion
                        </label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            placeholder="homer@gmail.com"
                            aria-multiline
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                          />
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Medidas
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="1.5mx3.4mx1.2m" required value={this.state.measure} onChange={this.onChangeMeasure}/>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Material
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="madera roble" required value={this.state.material} onChange={this.onChangeMaterial}/>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Color
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Cafe" required value={this.state.woodColor} onChange={this.onChangeWoodColor}/>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Precio
                        </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" min="1" step=".01" placeholder="1500.67" required value={this.state.price} onChange={this.onChangePrice}/>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Imagenes
                        </label>
                        <div className="col-sm-10">
                            <div className="custom-file">
                                <input type="file" ref={this.fileInput} className="custom-file-input" id="customFile" onChange ={this.onChangeListImages} multiple/>
                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                            </div>
                        </div>
                      </div>
                      <div className="form-group row has-success">
                        <label className="col-sm-2 col-form-label text-gray">
                          Categoria
                        </label>
                        <div className="col-sm-10">
                          {categoryList}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2" />
                        <div className="col-sm-6">
                            <button type="submit" className="btn btn-block btn-outline-success"><h5 className="text-bold">Submit</h5></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );     
    }

}
