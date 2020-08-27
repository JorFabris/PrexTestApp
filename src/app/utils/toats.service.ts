import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToatsService {

  constructor(public toastController: ToastController) {}


  async showToastError(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration:3000,
      position:'top',
      cssClass:'toast-custom',
      mode:'ios',
      color:'danger'
    });
    toast.present();
  }

  async showToastSuccess(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration:3000,
      position:'top',
      cssClass:'toast-custom',
      mode:'ios',
      color:'success'
    });
    toast.present();
  }

}
