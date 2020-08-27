import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFilmPage } from './edit-film.page';

const routes: Routes = [
  {
    path: '',
    component: EditFilmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFilmPageRoutingModule {}
