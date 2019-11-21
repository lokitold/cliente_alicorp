import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ArchivoService} from '../../servicio-api/archivo.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {MatProgressBarModule} from '@angular/material'
import {MatCardModule} from '@angular/material/card';
import { FavoritoService } from 'src/app/servicio-api/favorito.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subirarchivo',
  templateUrl: './subirarchivo.component.html',
  styleUrls: ['./subirarchivo.component.scss']
})




export class SubirarchivoComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: ElementRef;
  files  = [];
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  categorias: any;
  subcategorias: any;



  constructor(private archivoService: ArchivoService,private favorito : FavoritoService) { }

  ngOnInit() {
    this.listarSubCategorias();
  }

 
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    // this.uploadService.upload(formData).pipe(
    //   map(event => {
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         file.progress = Math.round(event.loaded * 100 / event.total);
    //         break;
    //       case HttpEventType.Response:
    //         return event;
    //     }
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     file.inProgress = false;
    //     return of(`${file.data.name} upload failed.`);
    //   })).subscribe((event: any) => {
    //     if (typeof (event) === 'object') {
    //       console.log(event.body);
    //     }
    //   });
  }


  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
}


onClick() {
  const fileUpload = this.fileUpload.nativeElement;
fileUpload.onchange = () => {
  for (let index = 0; index < fileUpload.files.length; index++)
  {
   const file = fileUpload.files[index];
   this.files.push({ data: file, inProgress: false, progress: 0});
  }
    this.uploadFiles();
  };
  fileUpload.click();
}


removeSelectedFile(index){
  event.preventDefault();
  this.files.splice(index,1);
}



listarSubCategorias() {
  this.favorito.favoritoSubCategorias().subscribe(
    data => {
      var keys = Object.keys(data);
      this.categorias = data
      for (let index = 0; index < keys.length; index++) {
        this.subcategorias = data[index]["idcategoria"];
      }
    }
  )
}

functionCall(event){
  console.log(event)
}


sendFiles(){
  // var formdata = new FormData();

  // formdata.append("arch_nombre", "as");
  // formdata.append("arch_descripcion", "as");
  // formdata.append("arch_file", "as");
  // formdata.append("subcategoria_id", "15");

  // for (let index = 0; index < this.files.length; index++) {
  //   const file = this.files[index];
    
  //   formdata.append("arch_nombre", this.files.data.name[index]);
  //   formdata.append("arch_descripcion", "as");
  //   formdata.append("arch_file", file);
  //   formdata.append("subcategoria_id", "15");
  


  // }

// console.log(this.files)
// console.log(this.files[0].data.name)


 for (let index = 0; index < this.files.length; index++) {
    // const file = this.files[index];
    // console.log(this.files[index].data.name)

    var formdata = new FormData();
    formdata.append("arch_nombre", this.files[index].data.name);
    formdata.append("arch_descripcion", "ass");
    formdata.append("arch_file", this.files[index].data);
    formdata.append("subcategoria_id", "15");
    formdata.append("categoria_id", "2");

    this.archivoService.enviarArchivoFunc(formdata).subscribe(
      data => {
        console.log(data);
      }
    )


  }
}

}
