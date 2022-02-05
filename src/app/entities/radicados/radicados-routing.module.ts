import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadicadosPage } from './radicados.page';

const routes: Routes = [
  {
    path: '',
    component: RadicadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadicadosPageRoutingModule {}
