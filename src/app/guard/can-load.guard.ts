import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){

  }
  async canActivate() {
    
    let resp = await this.userService.returnUser();
    if(resp){
      return resp;
    }else{
      this.router.navigate(['login'])
    }

  
  }
  
}
