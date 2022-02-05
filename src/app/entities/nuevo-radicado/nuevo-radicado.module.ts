import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoRadicadoPageRoutingModule } from './nuevo-radicado-routing.module';

import { NuevoRadicadoPage } from './nuevo-radicado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoRadicadoPageRoutingModule
  ],
  declarations: [NuevoRadicadoPage]
})
export class NuevoRadicadoPageModule {}
