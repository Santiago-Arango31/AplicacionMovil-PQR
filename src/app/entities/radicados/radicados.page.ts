import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Radicado } from 'src/app/models/radicado.model';
import { User } from 'src/app/models/user.model';
import { RadicadosService } from 'src/app/service/radicados/radicados.service';
import { ReclamosPage } from '../reclamos/reclamos.page';

@Component({
  selector: 'app-radicados',
  templateUrl: './radicados.page.html',
  styleUrls: ['./radicados.page.scss'],
})
export class RadicadosPage implements OnInit {
  @Input() usuario : User
  radicados : any = null
  auxRadicado: Radicado = null
   
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private radicadosService: RadicadosService
  ) {
    this.radicados = null
   }

  ngOnInit() {
    this.consultarRadicados()
  }

  consultarRadicados() : void {
    this.radicadosService.findByUserId(this.usuario.id_usuario).subscribe(
      success => {
        if (success.status == 200) {
          this.radicados = success.body      
        } else {
          this.radicados = null
          this.mensajesError('No se han encontrado resultados que coincidan con la busqueda')
        }
      }, error => {
        this.radicados = null
        this.mensajesError('No se han encontrado resultados que coincidan con la busqueda')
      }
    )
  }


  async generarReclamo(radicado){
    const modal = await this.modalController.create({
      component: ReclamosPage,
      swipeToClose: true,
      mode: 'ios',
      componentProps: {
        'usuario': this.usuario,
        'radicado': radicado
      }
    });
    modal.onDidDismiss().then(() => {
      console.log('dismiss Modal')
    })
    return await modal.present();
  }

  async mensajesError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  cerrarModal() : void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
