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


  ip = "http://34.213.90.54";
  // ip = "";


  loginUrl = this.ip + "/login";

  // http://34.213.90.54/login?usuario=jeiner&password=toor



  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')  || 'false');

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn')  || this.loggedInStatus.toString());
  }

  getUserDetails(usuario, password) {
  return this.http.post<myData>(this.loginUrl + '?usuario=' + usuario + '&password=' + password , {usuario, password}, {headers : this.headers});
  }



}
