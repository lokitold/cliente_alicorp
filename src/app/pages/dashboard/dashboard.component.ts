import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { FavoritoService } from 'src/app/servicio-api/favorito.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})


export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  categorias: any;
  subcategorias: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private favorito: FavoritoService) {config.backdrop = 'static';
  config.keyboard = false; }

  ngOnInit() {
    this.listarSubCategorias();


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }

  openXl(content) 
  { this.modalService.open(content, {size: 'lg'}); }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  listarSubCategorias(){
    this.favorito.favoritoSubCategorias().subscribe(
      data => {
        var keys = Object.keys(data);
        var len = keys.length;
        console.log(data);
        console.log(data["0"]);
        console.log(len);
        this.categorias = data
        for (let index = 0; index < keys.length; index++) {
          // this.categorias = data[index]
          console.log(data[index]["subcategoria"][""]);
          // this.subcategorias = data[index]["subcategoria"];
          this.subcategorias = data[index]["idcategoria"];
        }

      }
      
    )

    
  }


  
  items:any = [{'name' : 'Prashant'}]  
  myDist = [];
  
  addDistrict(item){
     this.myDist.push(item)
     console.log(this.myDist)

    }


}
