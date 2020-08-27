import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToatsService } from '../utils/toats.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Users } from '../models/Users.model';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  URLApi = environment.urlApi;

  private subjUser = new Subject<any>();
  isLogged:boolean = false;

  constructor(
    private http:HttpClient,
    private toastService:ToatsService,
    private storage:Storage,
    private router:Router) { }


  login(userLogin){
   this.http.post(`${this.URLApi}/usuarios/login`,userLogin)
   .subscribe(async(data:any)=>{
    if(!data.ok){
      this.toastService.showToastError(data.msg);
      return null;
    }

    this.storage.set('film-user',data.usuario)
    .then(resp=>{
      this.router.navigate(['/home'])
    })

   })
  }

  postUsuario(User:Users){
    return this.http.post(`${this.URLApi}/usuarios/create`,User)
    .subscribe((data:any)=>{
      
      
      let userLogin:any = {
        email:'',
        password:''
      };
      userLogin.email = data.email;
      userLogin.password = data.password;
      
      
      this.login(userLogin)

    })
  }

  returnUserObservable(): Observable<any> {
    return this.subjUser.asObservable();
  }

  getUser() {
    this.subjUser.next({
      isLogged: this.isLogged
    })
  }

  returnUser(){
    return new Promise<boolean>(async (resolve)=>{
      let user = await this.storage.get('film-user') || null; 
      console.log(user);
      
      if(user != null){    
        this.isLogged = true;    
        resolve(  this.isLogged);
      }else{
        this.isLogged = false;
        resolve(  this.isLogged);
      }
      this.getUser();
    })
   
  }
}
