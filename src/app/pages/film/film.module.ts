import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmPageRoutingModule } from './film-routing.module';

import { FilmPage } from './film.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmPageRoutingModule,
    PipesModule
  ],
  declarations: [FilmPage]
})
export class FilmPageModule {}
