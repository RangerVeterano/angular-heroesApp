import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


//Creamnos nustra variable para las rutas de nuestro programa
const routes: Routes = [
  {
    //Cuando alguien entra en Auth se cargan las rutas hijas por medio del LazyLoad
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:'heroes',
    loadChildren: () => import("./heroes/heroes.module").then(m => m.HeroesModule) 
  },
  {
    //Ruta para cuando se busque una páguina que no exista
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404' //redirigimos a 404
  },
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes)//importamos nuestro modulo y le damos las rutas que queremos en la aplicacion
  ],
  exports: [
    RouterModule//Exportamos nuestro modulo de rutas
  ]
})
export class AppRoutingModule { }
