import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoRadicadoPage } from './nuevo-radicado.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoRadicadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoRadicadoPageRoutingModule {}
