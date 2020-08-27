import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Films } from 'src/app/models/Films.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showSearchBar:boolean = false;
  pagina:number = 0;

  arrFilms:Films[] = [];
  arrRates:any[] = [1,2,3,4,5];
  infDisabled:boolean = false
  txtSearch:string = '';

  constructor(private _filmsService:FilmService) { }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.getFilmsPaginated(null,true)
  }


  //Función: obtiene listado de films paginados.
  getFilmsPaginated(event?,force:boolean = false){
    if(force){
      this.arrFilms = [];
      this.pagina = 0;
    }
    this.pagina ++;
    this._filmsService.getAllFilmsPaginated(this.pagina)
    .subscribe((data:any)=>{
      console.log(data);
      
      this.arrFilms.push(...data);
      if(event){
        event.target.complete();
        if(data.length == 0){
            this.infDisabled = true;
        }
       
      }
    })
  }

  //Función: pull to refresh en el home
  doRefresh(event){
    this.infDisabled = false
    this.getFilmsPaginated(event,true);
  }


  //Funcion: muestra y oculta la search bar
  showSearch(){
    this.showSearchBar = !this.showSearchBar;
  }

  //Funcion: realiza la busqueda del texto ingresado en la searchbar
  searchFilm(){
    if(this.txtSearch == ''){
      this.getFilmsPaginated(null,true)
      return null
    }
    
    this._filmsService.searchFilm(this.txtSearch)
    .subscribe((data:any)=>{
      console.log(data);
      this.arrFilms = data
      
    })
  }

}
