import React, { Component } from 'react'
import Header from "../../../partials/admin/Header";
import ContentHeader from "../../../partials/admin/ContentHeader";
import Menu from "../../../partials/admin/Menu";
import Footer from "../../../partials/admin/Footer";
import Chart from 'chart.js';
import Axios from 'axios';
import Ip from '../../../preferences/Ip';

export default class SalesReport extends Component {
    
    state = {
        list_report : []
    }

    chartRef = React.createRef();

    async componentDidMount(){
        await this.makeReport();
    }

    async makeReport(){
        const response = await Axios.get(`${Ip.getHost()}/api/sales_report`);
        this.setState({
            list_report : response.data
        });
        let arrayProduct = [];
        let arrayCount = [];
        let arrayColor = [];
        let array = this.state.list_report;
        for (let index = 0; index < array.length; index++) {
            arrayProduct.push(array[index].name);
            arrayCount.push(array[index].sum);
            arrayColor.push("#"+((1<<24)*Math.random()|0).toString(16));
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: arrayProduct, //['30-05-2020','31-05-2020','1-06-2020','02-06-2020','03-06-2020','04-06-2020','05-06-2020','06-06-2020'],
                datasets: [
                    {
                        label: "Cantidad de Ventas por Producto",
                        data: arrayCount, //[2,3,9,5,5,6,2,1],
                        backgroundColor : arrayColor,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    
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

    getContent(){
        return(
            <div className="content-wrapper">
                <ContentHeader title="Reportes"></ContentHeader>
                <div className="card card-outline card-success" id="cardContentMain">
                    <div className="card-header">
                        <h4 className="card-title text-green text-bold">
                        Reporte de Ventas de Muebles
                        </h4>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                        </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container mt-5">
                            <div className="row">
                                <canvas id="myChart" ref={this.chartRef}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
