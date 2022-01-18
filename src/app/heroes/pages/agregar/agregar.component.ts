import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  //arreglo con los objerto para las opciones de los publishers
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroePorId(id))
        )
        .subscribe((heroe) => this.heroe = heroe)
    }

  }

  //metodo para guardar heroe
  guardar() {

    // Si no tiene el nombre no se hace nada
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    //Si el heroe que queremos insertar tiene el id quiere decir que se quiere acutalizar
    if (this.heroe.id) {
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnakbar('Regisro actualizado'))

    } else {
      //crear nuevo registro
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(resp => {
          this.router.navigate(['/heroes/editar', resp.id])
          this.mostrarSnakbar('Regisro creado')
        })
    }

    console.log(this.heroe.id);
  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "250px",
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
            })
        }
      }
    )
  }

  mostrarSnakbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'OK!', {
      duration: 2500
    })
  }

}
