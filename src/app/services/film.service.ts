import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Films } from '../models/Films.model';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  urlApi = environment.urlApi;

  constructor(private http:HttpClient,private fileTransfer:FileTransfer,private storage:Storage) { }

  getAllFilmsPaginated(pagina){

    let params = new HttpParams()
    params = params.append('pagina',pagina)

   return this.http.get(`${this.urlApi}/peliculas/getAll`,{params})
    .pipe(
      map(res=>{return <Films[]>res})
    )

  }

  postFilm(Film:Films){
    return this.http.post(`${this.urlApi}/peliculas/create`,Film)
    .pipe(
      map(res=>{return <Films>res})
    )
  }

  updateFilm(Film:Films){
    return this.http.put(`${this.urlApi}/peliculas/update`,Film)
    .pipe(
      map(res=>{return <Films>res})
    )
  }

  getFilmById(id){
   return this.http.get(`${this.urlApi}/peliculas/getOne/${id}`)
    .pipe(
      map(res=>{return <Films>res})
    )
  }

  async saveFavorites(film:Films){
    let arrFilms:any[] = await this.storage.get('favorites');
    if(arrFilms == null){
      arrFilms = [];
      arrFilms.push(film)
    }else{
      let existe = arrFilms.find( f => f._id == film._id);
      if(!existe){
        arrFilms.unshift(film)
      }
     
    }
    
    return this.storage.set('favorites',arrFilms)
  }

  async getFavorites(){
    let arrFilms:any[] = await this.storage.get('favorites');

    return arrFilms;
  }

  searchFilm(value){
    return this.http.get(`${this.urlApi}/peliculas/search/${value}`)
    .pipe(
      map(res=>{return <Films[]>res})
    )
  }
  deleteFilm(id){
    return this.http.delete(`${this.urlApi}/peliculas/deleteOne/${id}`)
     .pipe(
       map(res=>{return res})
     )
   }

  uploadImg(img:string,filmId:string){

    const options:FileUploadOptions = {
      fileKey:'image',
      headers:{
        'filmId':filmId
      }
    }

    const fileTransfer:FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${this.urlApi}/peliculas/upload`,options)
    .then(data=>{
      console.log(data);
      
    }).catch(err=>{
      console.log('Error en carga',err);
      
    })

  }
}
