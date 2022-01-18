import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class HeroeImagePipe implements PipeTransform {

  transform(arg:Heroe): string {
    
    return `assets/heroes/${arg.id}.jpg`;
  }

}
