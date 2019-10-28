import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private http: HttpClient) { }

  header = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  localStorage.getItem("token"))
  }

  ip= "http://192.168.1.130:8000";

  favorito = this.ip + "/";


  perfilDetalles(){
    // return this.http.get(this.favorito+ localStorage.getItem("token"), this.header)

    return this.http.get(this.favorito , this.header)

  }




}
