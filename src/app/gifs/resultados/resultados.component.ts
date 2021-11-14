import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent{

  constructor(private gifsService: GifsService) { }

  get results(){
    return this.gifsService.results;
  }

  onLoadImg(img: HTMLImageElement){
    img.classList.remove("loading")
  }

}
