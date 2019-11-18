import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

interface myData {
  status: any;
  users: any;
}



@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient) { }


  _headers = new HttpHeaders();
  headers = this._headers.append('Content-Type', 'Application/json');


  ip = "http://192.168.1.130:8000/login";
   loginUrl = this.ip + "/login?usuario=";


  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')  || 'false');

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn')  || this.loggedInStatus.toString());
  }

  getUserDetails(usuario, password) {
  return this.http.post<myData>(this.ip + '?usuario=' + usuario + '&password=' + password , {usuario, password}, {headers : this.headers});
  }



}
