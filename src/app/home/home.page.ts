import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NuevoRadicadoPage } from '../entities/nuevo-radicado/nuevo-radicado.page';
import { RadicadosPage } from '../entities/radicados/radicados.page';
import { ReclamosPage } from '../entities/reclamos/reclamos.page';
import { User } from '../models/user.model';
import { RadicadosService } from '../service/radicados/radicados.service';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios: User[]
  usuario: User

  constructor(
    public toastController: ToastController,
    private radicadosService: RadicadosService,
    private usuariosService: UsuariosService,
    private modalController: ModalController

  ) {
    this.usuarios = []
    this.usuario = null
  }

  ngOnInit() {
    this.usuariosRegistrados()
  }

  usuariosRegistrados(){
    this.usuariosService.find().subscribe(
      success => {
        if (success.status == 200) {
          this.usuarios = success.body
        } else {
          this.usuarios = []
          this.mensajesError(' No se han encontrado usuarios, algunas funciones se veran limitadas. Intenta nuevamente')
        }
      }, error => {
        console.error(error)
        this.mensajesError(error)
      }
    )
  }

  seleccionarUsuario(auxUsuario: User): void {
    this.usuario = auxUsuario
  }


  ver(type: string): void {
    switch (type) {
      case 'nuevoRadicado':
        this.presentarModal(NuevoRadicadoPage)
        break;
      case 'nuevoReclamos':
        this.presentarModal(ReclamosPage)
        break;
      case 'radicados':
        this.presentarModal(RadicadosPage)
        break;
    }
  }

  verRadicados(): void {
    console.log('verRadicados')
  }


  async presentarModal(component) {
    const modal = await this.modalController.create({
      component,
      swipeToClose: true,
      mode: 'ios',
      componentProps: {
        'usuario': this.usuario
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
      duration: 2000
    });
    toast.present();
  }

}
