import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin:1rem;
    }
  `]
})
export class HomeComponent implements OnInit {

  //Creamos un getter para recoger a nuestro usuario
  get auth() {
    return this.authService.auth
  }

  //Inyectamos nuestro servicio de auth para poder hacer un get del usuario
  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.route.navigate(['./auth'])
  }

}
