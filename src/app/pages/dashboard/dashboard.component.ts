import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private favorito: FavoritoService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  mr: NgbModalRef;

  ngOnInit() {
    this.listarSubCategorias();
    // this.registrar();
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


  // public registrar() {
  //   this.mr = this.modalService.open(content);
  //  }


  openXl(content) { this.modalService.open(content, { size: 'lg' }); }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  listarSubCategorias() {
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
  coco: any;

  myDist = [{
    id_subcategoria : this.coco,
  }];

  numerodeprueba = 0;
  estado = false;
  numero = 0;
  addDistrict(item) {

    if (this.myDist.length == 0) {
      // this.myDist.push(item)
       this.coco = item
       this.myDist.push(this.coco)
    }
    else if (this.myDist.length != 0) {
      for (let index = 0; index < this.myDist.length; index++) {
        if (this.myDist[index] === item) {
          this.estado = true;
          this.numero = index;
          break;
        }
      }
      if (this.estado == true) {
        this.myDist.splice(this.numero, 1);
        this.estado = false;
      }
      else {
        // this.myDist.push(item)
        this.coco = item
        this.myDist.push(this.coco)
      }

    }

  }


  sendPreferencias(){

    // const formArray = new FormData();

    // for (let index = 0; index < this.myDist.length; index++) {
    //   formArray.append('id_subcategoria', this.myDist[index]);
    // }


    var subcategoria = {
      id_subcategoria: 34
  };



    const formData = new FormData();
    formData.append('api_token', localStorage.getItem("token"));

    for (var key in subcategoria) {
      console.log(key, subcategoria[key]);
      formData.append('subcategoria', subcategoria[key]);
  }

    // formData.append('subcategoria', new Blob( [ JSON.stringify( formArray ) ]));


    console.log(formData);
    


    this.favorito.sendFavoritoSubCategorias(formData).subscribe(
      data => {
        console.log(data);
      }
    )
    // console.log("hola");

  }




}
