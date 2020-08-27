import React, { Component } from 'react';
import Header from "../../../partials/admin/Header";
import ContentHeader from "../../../partials/admin/ContentHeader";
import Menu from '../../../partials/admin/Menu'
import Footer from "../../../partials/admin/Footer";
import Chart from 'chart.js';
import Axios from 'axios';
import Ip from '../../../preferences/Ip';

export default class SaleReportDate extends Component {
    
    state = {
        list_report : []
    }

    chartRef = React.createRef();

    async componentDidMount(){
        await this.makeReport();
    }

    async makeReport(){
        const response = await Axios.get(`${Ip.getHost()}/api/sales_date_report`);
        this.setState({
            list_report : response.data
        });
        let arrayDate = [];
        let arrayCount = [];
        let arrayColor = [];
        let array = this.state.list_report;
        for (let index = 0; index < array.length; index++) {
            arrayDate.push(array[index].date);
            arrayCount.push(array[index].count);
            arrayColor.push("#"+((1<<24)*Math.random()|0).toString(16));
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: arrayDate,
                datasets: [
                    {
                        label: "Cantidad de Pedidos Completados, Por Fecha",
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
            <>
                <Header></Header>
                <Menu></Menu>
                {this.getContent()}
                <Footer></Footer>
            </>
        )
    }

    getContent(){
        return (
            <div className="content-wrapper">
                <ContentHeader title="Reportes"></ContentHeader>
                <div className="card card-outline card-success" id="cardContentMain">
                    <div className="card-header">
                        <h4 className="card-title text-green text-bold">
                        Reporte de Pedidos
                        </h4>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                        </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="col-md-10">
                             <canvas id="myChart" ref={this.chartRef}/>
                        </div>
                    </div>
                </div>
            </div>
        )
        

    }
}
