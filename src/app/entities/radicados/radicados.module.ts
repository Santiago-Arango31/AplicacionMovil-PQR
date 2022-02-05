import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadicadosPageRoutingModule } from './radicados-routing.module';

import { RadicadosPage } from './radicados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadicadosPageRoutingModule
  ],
  declarations: [RadicadosPage]
})
export class RadicadosPageModule {}
