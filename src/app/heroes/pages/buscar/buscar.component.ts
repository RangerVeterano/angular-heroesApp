import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';//Variable inicializada para el buscador
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) {

  }

  ngOnInit(): void {
  }

  //Metodo que busca las sugerencias posibles para el buscador
  buscar() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes)
  }

  //Metodo que se ejecuta cuando se hace click en la suegerencia mostrada
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return
    }

    // Nos creamos una constante para guardar los valores del evento
    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero //cambiamos nuestro termino para coincidir con el termino de busqueda

    //Buscamos nuestro heroe en la base de datos 
    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe)
  }

}
