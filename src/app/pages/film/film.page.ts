import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { Films } from 'src/app/models/Films.model';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ToatsService } from 'src/app/utils/toats.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  idFilm:any;
  Film:Films = {};

  constructor(private actRouter:ActivatedRoute,private alertCtrl:AlertController,
              private _filmService:FilmService,private toastService:ToatsService,
              private router:Router,private actionSheetCtrl:ActionSheetController
              ) { }

  ngOnInit() {
    this.idFilm = this.actRouter.snapshot.paramMap.get('id');
    this.getFilmId();

  }


  //Función: obtiene las films por ID
  getFilmId(){
    this._filmService.getFilmById(this.idFilm)
    .subscribe(data=>{
      console.log(data);
      
      this.Film = data;
    })
  }

  //Función: borra la film en caso de que el usuario precione "Okey".
  async deleteFilm(){
    const alert = await this.alertCtrl.create({

      header: 'Warning!',
   
      message: 'Delete film, are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this._filmService.deleteFilm(this.idFilm)
            .subscribe((data:any)=>{
                if(data.ok){
                  this.toastService.showToastSuccess(data.msg);
                  this.router.navigate(['home']);
                }
              
            })
          }
        }
      ]
    });

    await alert.present();

  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
    
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteFilm()
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.editFilm()
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
         this._filmService.saveFavorites(this.Film)
         .then(resp=>{
           this.toastService.showToastSuccess('Film saved')
         })
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  //Funcion:Redirecciona a la pagina de edición de la film
  editFilm(){
    this.router.navigate(['edit-film',this.idFilm])
  }
 

}
