import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Radicado } from 'src/app/models/radicado.model';
import { User } from 'src/app/models/user.model';
import { RadicadosService } from 'src/app/service/radicados/radicados.service';

@Component({
  selector: 'app-nuevo-radicado',
  templateUrl: './nuevo-radicado.page.html',
  styleUrls: ['./nuevo-radicado.page.scss'],
})
export class NuevoRadicadoPage implements OnInit {
  @Input() usuario : User
  tipo : string
  contenido : string
 
  
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private radicadosService: RadicadosService
  ) { 
    this.tipo = ''
    this.contenido = ''
  }

  ngOnInit() {}

  save(){
    if (this.tipo.length > 0 && this.contenido.length > 0 ) {
      this.crearRadicado()
    } else {
      this.mensaje('No ha sido posible registar tu solicitud con exito, prueba nuevamente llenando todos los campos')
    }
  }

  async crearRadicado(){
    const loading = await this.loadingController.create({
      duration: 6000,
    });
    await loading.present();
    let auxRadicado = this.createFromForm()
    
    this.radicadosService.create(auxRadicado).subscribe(
      success => {
        loading.dismiss()
        if (success.status == 201) {
          this.mensaje(' Registro realizado exitosamente ')
          setTimeout(() => {
            this.cerrarModal()
          }, 3000);
        } else {
          this.mensaje(' No se ha generado el registro exitosamente, intenta nuevamente')
        }

      }, error => {
        loading.dismiss()
        this.mensaje(' No se ha generado el registro exitosamente, intenta nuevamente')
        console.error(error)
      }
    )
  }

  private createFromForm(): Radicado {
    return {
      ...new Radicado(),
      id_usuario: this.usuario.id_usuario,
      tipo: this.tipo,
      fecha_creacion: new Date().toISOString(),
      fecha_modificacion: new Date().toISOString(),
      contenido: this.contenido,
    };
  }

  async mensaje(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  cerrarModal() : void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
