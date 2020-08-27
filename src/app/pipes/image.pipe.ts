import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const urlApi = environment.urlApi;
@Pipe({
  name: 'image'
})

export class ImagePipe implements PipeTransform {

  transform(img:string, filmId:string): string {
    
    return `${urlApi}/peliculas/image/${filmId}/${img}`;
  }

}
