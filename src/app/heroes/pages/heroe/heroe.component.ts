import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;//inicializamos variable e indicamos que ts confie en nosotros

  //Inyectamos nuestro servicio para la ruta activada
  constructor(
    private activatedRouter: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        //Empleamos la desestructuracion de los argumentos para extraer solo el id 
        switchMap(({ id }) => this.heroeService.getHeroePorId(id))
      )
      .subscribe({
        next: heroe => {
          this.heroe = heroe;
        }
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}
