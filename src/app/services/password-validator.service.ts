import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor() { }

  validatePassword(pass1:string,pass2:string){
    if(pass1.length < 6){
      return{ok:false,msg:"Password min length 6 characters"}
    }else if(pass1 != pass2){
      return{ok:false,msg:"Passwords don´t match"}
    }else{
      return{ok:true,msg:''}
    }
  }
}
