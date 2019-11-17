import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild ('ModalPreferencias') public ModalPreferencias: ElementRef;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  categorias: any;
  subcategorias: any;
  archivos: any;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private favorito: FavoritoService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  mr: NgbModalRef;

  ngOnInit() {
    // this.ModalFavorito(this.ModalPreferencias);
    //  this.listarSubCategorias();

    this.listarArchivosFavoritos()

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

  ModalFavorito(ModalPreferencias) {
    try {
    this.modalService.open(ModalPreferencias, { size: 'lg'}); 
    } catch (error) {
      
    }
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  myDist = [];


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

  // myDist = [];

  numerodeprueba = 0;
  estado = false;
  numero = 0;
  addDistrict(item) {

    if (this.myDist.length == 0) {
      // this.myDist.push(item)
       this.coco = item
       this.myDist.push({
        'id_subcategoria': this.coco
      })
    }
    else if (this.myDist.length != 0) {
      for (let index = 0; index < this.myDist.length; index++) {
        if (this.myDist[index]["id_subcategoria"] === item) {
          this.estado = true;
          this.numero = index;
        console.log("asdadsa" + index)
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
        this.myDist.push({
          'id_subcategoria': this.coco
        })
      }
    }
  }


  sendPreferencias(){
    const data = {'api_token': localStorage.getItem("token"), "subcategoria": this.myDist};
    console.log(data);
    this.favorito.sendFavoritoSubCategorias(data).subscribe(
      data => {
        console.log(data)
      }
    );

  }


  listarArchivosFavoritos(){
    console.log("holaaa")
    this.favorito.listarFavoritos().subscribe(
      data => {
        console.log(data)
        this.archivos = data;
      }
    );
  }

}
