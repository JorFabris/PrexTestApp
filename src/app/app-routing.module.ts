import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from './guard/can-load.guard';

const routes: Routes = [
 
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path: 'home',
    canActivate:[CanLoadGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

  },
  {
    path: 'film/:id',
    canActivate:[CanLoadGuard],
    loadChildren: () => import('./pages/film/film.module').then( m => m.FilmPageModule)
  },
  {
    path: 'edit-film/:id',
    canActivate:[CanLoadGuard],
    loadChildren: () => import('./pages/edit-film/edit-film.module').then( m => m.EditFilmPageModule)
  },
  {
    path: 'favorites',
    canActivate:[CanLoadGuard],
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
