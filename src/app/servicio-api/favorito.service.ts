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

  
  listaSubcategorias = this.ip + "/listar-categorias";
  enviarFavorito = this.ip + "/seleccionar-subcategoria";
  listarFavorito = this.ip + "/Bandeja-de-archivos";
  

  favoritoSubCategorias(){
    return this.http.get(this.listaSubcategorias, this.header)
    // return this.http.get(this.listaSubcategorias , this.header)
  }

  sendFavoritoSubCategorias(body : any){
    return this.http.post(this.enviarFavorito, body, this.header)
  }

  listarFavoritos(){
    return this.http.get(this.listarFavorito , this.header)
  }


}
