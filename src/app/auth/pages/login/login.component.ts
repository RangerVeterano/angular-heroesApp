import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  login() {
    //Ir al backend para comprobar que el usuario existe
    //Devuelve un usuario
    this.authService.login()
      .subscribe(resp => {
        console.log(resp);

        //si existe el id navegamos a Heroes
        if (resp.id) {

          this.route.navigate(['./heroes'])
        }

      })

  }

  //Metodo para "ingresar sin usuario"
  ingresarSinLogin() {
    this.authService.logout() //Borramos nuestro usuario de la variable local
    this.route.navigate(['/heroes']) // Navegamos a nuestro listado de heroes
  }

}
