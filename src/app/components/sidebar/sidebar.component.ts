import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/servicio-api/perfil.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'menu',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Nuevos Archivos',  icon:'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];


export const ROUTESINTERNO: RouteInfo[] = [
    { path: '/dashboard', title: 'menu',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Nuevos Archivos',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];


export const ROUTESEXTERNO: RouteInfo[] = [
  { path: '/dashboard', title: 'menu',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' }

];


export const ROUTESMARKETING: RouteInfo[] = [
  { path: '/dashboard', title: 'menu',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Nuevos Archivos',  icon:'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private perfil: PerfilService) { }

  ngOnInit() {

    this.listarDataPerfilSidebar();
   
  }

  listarDataPerfilSidebar(){
    this.perfil.listarDataPeril().subscribe(
      data => {

        switch (data["data"]["id_rol"]) {
      case 1:
      
        this.menuItems = ROUTESINTERNO.filter(menuItem => menuItem);
        this.router.events.subscribe((event) => {
          this.isCollapsed = true;
       });

        break;
        case 2:

            this.menuItems = ROUTESEXTERNO.filter(menuItem => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
           });
        
        break;
        case 3:

            this.menuItems = ROUTESMARKETING.filter(menuItem => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
           });
        
        break;
    }
        
        
      }
    )
  }




}
