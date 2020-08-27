import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Films } from 'src/app/models/Films.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  arrFilms:Films[] = [];

  constructor(private _filmService:FilmService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getFavorites();
  }

  getFavorites(){
    this._filmService.getFavorites()
    .then(resp=>{
      console.log(resp);
      this.arrFilms = resp
    })

  }

}
