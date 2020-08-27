import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { Plugins,StatusBarStyle } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'star'
    },
 
  ];
  isLogged:boolean = false;
  userSubscription: Subscription;
  

  constructor(
    private platform: Platform,
    private userService:UserService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });
  
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#1C1C1C' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  ngOnInit() {
    


    this.userSubscription = this.userService.returnUserObservable()
      .subscribe(data => {
        this.isLogged = data.isLogged;
      })

    this.userService.getUser();
    const path = window.location.pathname.split('/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
