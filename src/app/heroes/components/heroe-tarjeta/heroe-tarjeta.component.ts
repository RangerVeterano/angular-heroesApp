import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card {
      margin-top:20px;
  }
`]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe!: Heroe; //Con el ! le indicamos que siempre va a tener un heroe

  constructor() { }

  ngOnInit(): void {
  }

}
