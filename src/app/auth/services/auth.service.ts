import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //Url para las peticiones
  private baseUrl: string = environment.baseUrl

  private _auth: Auth | undefined; //Variable para guardar a nuestro usuario, puede que sea nulo

  //Getter de usuario
  get auth(): Auth {
    //Desestructuramos la variable para evitar modificaciones por error
    return { ...this._auth! }
  }

  //importamos nuestro servicio para las peticiones http
  constructor(private http: HttpClient) { }

  //Metodo para comprobar el estado de la autentificacion
  verificaAutentificacion(): Observable<boolean> {

    //Si en local storage no existe el token se devuelve false
    if (!localStorage.getItem('token')) {

      //Con el of conseguimos crear un observable del argumento que le pasemos
      return of(false)
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        //Map sirve para transformar lo que se recibe del operador, transformarlo y devolver un nuevo valor
        map(auth => {
          //Guardamos nuesto usuario en la variable local
          this._auth = auth
          return true
        })
      )
  }

  //Metodo para registrarse, busca en la base de datos un usuario y de paso lo guarda de forma local
  login() {
    //Peticion get para recoger a nuestro usuario, devuvelve un observable de tipo Auth
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        //El tap se usa para generar efectos secundarios, antes de que nos suscribamos
        //Lo empleamos para guardar nuestro resultado de usuario antes de mandarlo
        tap(resp => { this._auth = resp }),
        //Encadenamos otro tap para poder guardar el id del usuario en nuestro local storage
        tap(resp => { localStorage.setItem('token', resp.id) })
      )
  }

  //Metodo para des logearse de la aplicacion
  logout() {
    this._auth = undefined;
  }
}
