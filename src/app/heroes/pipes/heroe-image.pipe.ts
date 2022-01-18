import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',

})
export class HeroeImagePipe implements PipeTransform {

  transform(arg: Heroe): string {

    if (!arg.id && !arg.alt_img) {
      return `assets/no-image.png`;

    } else if (arg.alt_img) {
      return arg.alt_img
    }

    return `assets/heroes/${arg.id}.jpg`;
  }

}
