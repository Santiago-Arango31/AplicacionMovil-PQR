import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nuevo-radicado',
  templateUrl: './nuevo-radicado.page.html',
  styleUrls: ['./nuevo-radicado.page.scss'],
})
export class NuevoRadicadoPage implements OnInit {
  @Input() usuario : User
  
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('user',this.usuario)
  }

  cerrarModal() : void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
