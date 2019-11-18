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

  ipp= "http://192.168.1.130:8000";

  //:ip= "http://localhost:3000";



  //listaFavorito = this.ip + "/listar-categorias";
  enviarFavorito = this.ipp + "/seleccionar-subcategoria";
  listaSubcategorias= this.ipp + "/users";

  listarFavorito = this.ipp + "/Bandeja-de-archivos";
  // listarFavorito = this.ipp + "/users";


  favoritoSubCategorias(){
    // return this.http.get(this.favorito+ localStorage.getItem("token"), this.header)
    return this.http.get(this.listaSubcategorias , this.header)
  }

  sendFavoritoSubCategorias(body : any){
    return this.http.post(this.enviarFavorito, body, this.header)
  }

  listarFavoritos(){
    return this.http.get(this.listarFavorito , this.header)
  }


}
