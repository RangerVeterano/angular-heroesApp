import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  //Inyectamos nuestro servicio de auth para poder recofger lo datos de nuestro usuario
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutentificacion()
      //Con el pipe hacemos una operacion antes de que se resuelva la peticion
      .pipe(
        //Comprobamos si está autenticado el usuario
        tap(estaAutenticado => {
          //En caso de que no esté autenticado lo sacamos al login
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      );
    // //Si este objeto existe
    // if (this.authService.auth.id) {

    //   //Devolvemos true y dejamos al usuario pasar
    //   return true
    // }

    // console.log('Bloqueado por pendejo pero esta vez por el Can Activate');
    // return false;
  }

  //Can load unicamente restringe que se pueda cargar el modulo, si el modulo ha 
  //sido cargado previamente se puede acceder a el saltandose esta instrucción
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutentificacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      );;

    // //Si este objeto existe
    // if (this.authService.auth.id) {
    //   //Devolvemos true y dejamos al usuario pasar
    //   return true
    // }

    // console.log('Bloqueado por pendejo');
    // return false;
  }
}
