import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage implements OnInit {
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
