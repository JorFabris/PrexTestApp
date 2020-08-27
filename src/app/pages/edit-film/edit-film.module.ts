import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFilmPageRoutingModule } from './edit-film-routing.module';

import { EditFilmPage } from './edit-film.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule,
    EditFilmPageRoutingModule
  ],
  declarations: [EditFilmPage]
})
export class EditFilmPageModule {}
