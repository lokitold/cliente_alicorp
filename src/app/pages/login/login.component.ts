import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicio-api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private Auth: LoginService, 
    private router: Router) {}

  ButtonLogin = false;

  ngOnInit() {
  }
  ngOnDestroy() {
  }


  loginUser(event : any){
    event.preventDefault()
    this.ButtonLogin = true;
    const target = event.target;
    const usuario = target.usuario.value;
    const password = target.password.value;
    this.Auth.getUserDetails(usuario,password).subscribe(
    data => {
    console.log(data)
    console.log(data['status'])
    try {
        if(data['status'] == "success") {
            this.Auth.setLoggedIn(true);
            localStorage.setItem('token', data.users['api_token'])
            window.location.replace('#/Inicio')
            const mensaje = "Acabas de iniciar sesión";
            return
        }
          else if (data['status'] == "false"){  
            this.ButtonLogin = false;
            console.log("no se pudo")
            const mensaje = "El usuario o contraseña son invalidos";
            target.usuario.value = "";
            target.password.value = "";
        }
        
    } catch (error) {
        this.ButtonLogin = false;
        const mensaje = "Error, el servidor no responde";
          
    }
    
    })
  }




}
