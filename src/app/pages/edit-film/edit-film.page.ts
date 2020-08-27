import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Films } from 'src/app/models/Films.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { IonSlides, AlertController } from '@ionic/angular';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ToatsService } from 'src/app/utils/toats.service';
const { Camera } = Plugins;
declare var window :any;

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.page.html',
  styleUrls: ['./edit-film.page.scss'],
})
export class EditFilmPage implements OnInit {

  @ViewChild('slideCreateFilm') slides:IonSlides;

  //Variable: Form builder para el control de los datos que se ingresa
  filmForm = this.fb.group({
    titulo:['', Validators.required],
    descripcion:['',Validators.required],
    puntaje:['',Validators.required],
    fecha_lanzamiento:['',Validators.required]
  });

  imgSelected:any;
  submitted:boolean = false;
  Film:Films = {};
  arrRates:number[] = [1,2,3,4,5];
  idFilm:any;



  constructor(private fb:FormBuilder,private actRoute:ActivatedRoute,private _filmService:FilmService,
    private alertCtrl:AlertController,private router:Router,private toastService:ToatsService
     ) { }



  ngOnInit() {
    this.idFilm = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.idFilm);
    //Comprueba que el id de los parametros sea distinto de 0 para poder hacer la peticion por id
    if(this.idFilm != 0){
      this.obtenerFilmId();
    }
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(false);
  }


  //Función: obtener los controles del Form builder de films(Para saber si tienen errores o si son validos)
  get f(){
    return this.filmForm.controls;
  }

  //Funcion: obtener film por ID
  obtenerFilmId(){
    this._filmService.getFilmById(this.idFilm)
    .subscribe(data=>{
      this.filmForm.patchValue({
        titulo:data.titulo,
        descripcion:data.descripcion,
        puntaje:data.puntaje,
        fecha_lanzamiento:data.fecha_lanzamiento
      })
      
    })
  }


  //Funcion: hace el post o el update segun los parametros que le pasamos
  createFilm(){
    //Post de film
    if(this.idFilm == 0){

   
    this.submitted = true;
    if(this.filmForm.invalid)return;
 
    console.log(this.filmForm.value);
    
    
    this._filmService.postFilm(this.filmForm.value)
    .subscribe(data=>{
      this.Film = data;
      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);
    })

  }else{
    //update de film

    this.submitted = true;
    if(this.filmForm.invalid)return;
    let film:Films = this.filmForm.value;
    film._id = this.idFilm;
    this._filmService.updateFilm(film)
    .subscribe(data=>{
      console.log(data);
      this.router.navigate(['home']);
      
    })

  }
    
  }

  async goBack(){
    if(!this.imgSelected && !this.filmForm.invalid){

      const alert = await this.alertCtrl.create({
        header: 'Warning!',
        message: 'If you leave this page without upload an image, film will be delete',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              return
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.deleteFilm();
             
            }
          }
        ]
      });
  
      await alert.present();

    }else{
      this.router.navigate(['home'])
    }
  }

  deleteFilm(){


      this._filmService.deleteFilm(this.Film._id)
      .subscribe((data:any)=>{
        console.log(data);
        if(data.ok){
          this.router.navigate(['home'])
          .then(resp=>{
            this.toastService.showToastSuccess(data.msg)
          })
        }
        
      })
      
  
  
  }


  async camara(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source:CameraSource.Photos,
      correctOrientation:true,
      resultType: CameraResultType.Uri
    });
   
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.imgSelected = imageUrl
    this._filmService.uploadImg( image.path,this.Film._id);
    
  }

}
