import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicio-api/login.service';
import { PerfilService } from 'src/app/servicio-api/perfil.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef,
    private perfil: PerfilService, private router: Router, private Auth : LoginService) {
    this.location = location;
  }

  nombre : string;
  apellido : string;

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.listarDataPerfilSidebar();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  CerrarSesion(event: any){
    event.preventDefault();
    this.Auth.setLoggedIn(false)
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  listarDataPerfilSidebar(){
    this.perfil.listarDataPeril().subscribe(
      data => {
        this.nombre = data["data"]["persona"]["per_nombres"];
        this.apellido = data["data"]["persona"]["per_apellido"];
       })
    }

}
