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
  public buttonSendPreferencias: boolean = true;


  categorias: any;
  subcategorias: any;
  archivos: any;


  coco: any;
  numerodeprueba = 0;
  estado = false;
  numero = 0;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private favorito: FavoritoService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  modal : NgbModalRef;

  ngOnInit() {
    this.ModalFavorito(this.ModalPreferencias);
    this.listarSubCategorias();
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

  ModalFavorito(ModalPreferencias) {
    try {
      this.modal = this.modalService.open(ModalPreferencias, { size: 'lg'}); 
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
        this.categorias = data
        for (let index = 0; index < keys.length; index++) {
          this.subcategorias = data[index]["idcategoria"];
        }
      }
    )
  }



  addDistrict(item) {

    if(this.myDist.length > 1){
      this.buttonSendPreferencias = false
    }
    else {
      this.buttonSendPreferencias = true
    }

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
    this.buttonSendPreferencias = true
    const data = {'api_token': localStorage.getItem("token"), "subcategoria": this.myDist};
    console.log(data);
    this.favorito.sendFavoritoSubCategorias(data).subscribe(
      data => {
        if (data["status"] == "true") {
          this.modal.close();
          this.buttonSendPreferencias = false
          
        }
      }
    );

  }


  public closeModal() {
    this.modal.close();
 }



  listarArchivosFavoritos(){
    this.favorito.listarFavoritos().subscribe(
      data => {
        console.log(data)
        this.archivos = data;
      }
    );
  }

}
