import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { IonSlide, IonSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ToatsService } from 'src/app/utils/toats.service';
import { Users } from 'src/app/models/Users.model';
import { PasswordValidatorService } from 'src/app/services/password-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrin') slides:IonSlides;

  typeInput:string = 'password'

  userLogin:any = {
    email:'',
    password:''
  }

  passwordValidation:any = {
    ok:true,
    msg:''

  }

  submitted:boolean = false;


  userForm = this.fb.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    email:['',Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
    password:['',Validators.required],
    password2:['',Validators.required]
  });


  constructor(private _userService:UserService,private validator:PasswordValidatorService,
              private fb:FormBuilder
              ) { }


  ngOnInit() {
 
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  login(fLogin:NgForm){
    // console.log(fLogin);
    this._userService.login(this.userLogin);
  }

  get f(){
    return this.userForm.controls;
  }

  showPassword(){
    (this.typeInput == 'password') ? this.typeInput = 'text' : this.typeInput = 'password'
  }

  changeSlide(index:number){
    this.slides.lockSwipes(false);
    this.slides.slideTo(index);
    this.slides.lockSwipes(true);
  }

  register(){
    this.submitted = true;
    let resp = this.validator.validatePassword(this.userForm.value.password,this.userForm.value.password2);
    this.passwordValidation = resp;
    console.log(this.userForm.value);
    let user:Users = this.userForm.value;
    
    this._userService.postUsuario(user);
    
    
  }

}
