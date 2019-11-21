import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  SERVER_URL= "http://192.168.1.130:8000/adjuntar-archivos";

  ip = "http://192.168.1.130:8000"
  enviarArchivo = this.ip + "/adjuntar-archivos"

  constructor(private httpClient: HttpClient) { }
  
  enviarArchivoFunc(body) {
    return this.httpClient.post<any>(this.enviarArchivo, body, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
