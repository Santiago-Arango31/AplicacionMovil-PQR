import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Radicado } from 'src/app/models/radicado.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { RespuestaAdm } from 'src/app/models/respuestaAdministrativa.model';
import { User } from 'src/app/models/user.model';
import { ReclamosService } from 'src/app/service/reclamos/reclamos.service';
import { RespuestaService } from 'src/app/service/respuestaAdministrativa/respuesta.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage implements OnInit {
  @Input() usuario : User
  @Input() radicado : Radicado
  reclamo : Reclamo
  respuestaAdministrativa : RespuestaAdm
  displayForm : Boolean
  auxReclamo : string
  
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private respuestaService: RespuestaService,
    private reclamosService: ReclamosService
  ) {
    this.reclamo = null
    this.respuestaAdministrativa = null
    this.displayForm = false
    this.auxReclamo = ''
   }

  ngOnInit() {
    this.consultarRespuestaAdministrativa()
    this.consultarReclamo()
  }

  consultarRespuestaAdministrativa(){
    this.respuestaService.findByRadicadoId(this.radicado.id_radicado).subscribe(
      success => {
        if (success.status == 200) {
          this.respuestaAdministrativa = success.body
        } else {
          this.respuestaAdministrativa = null
          this.mensajesError(' No se han encontrado usuarios, algunas funciones se veran limitadas. Intenta nuevamente')
        }

      }, error => {
        console.error(error)
      }
    )
  }

  consultarReclamo(){
    this.reclamosService.findByRadicadoId(this.radicado.id_radicado).subscribe(
      success => {
        if (success.status == 200) {
          this.reclamo = success.body
          console.log(this.reclamo)
        } else {
          this.reclamo = null
          this.mensajesError(' No se han encontrado usuarios, algunas funciones se veran limitadas. Intenta nuevamente')
        }

      }, error => {
        console.error(error)
      }
    )
  }


  async crearReclamo(){
    let auxFechaRadicado = new Date(new Date(this.radicado.fecha_creacion).setDate(new Date(this.radicado.fecha_creacion).getDate() + 5))
    if (auxFechaRadicado.getDate() <= new Date().getDate()) {
      if (this.respuestaAdministrativa === null){
        this.displayForm = true
      } else {
        const alert = await this.alertController.create({
          mode: 'ios',
          header: 'Alerta',
          message: 'Si no esta deacuerdo con la respuesta administrativa, presione continuar',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Continuar',
            handler: () => {
              this.displayForm = true
            }
          }]
    
        });
        await alert.present();
      }
    } else {
      this.mensajesError('El radicado se creo hace menos de 5 días, aún no se puede generar un relamo')
    }
  }


  save(){
    if (this.auxReclamo.length > 0 ) {
      this.generarReclamo()
    } else {
      this.mensajesError('No ha sido posible registar tu solicitud con exito, prueba nuevamente llenando todos los campos')
    }
  }

  async generarReclamo(){
    const loading = await this.loadingController.create({
      duration: 6000,
    });
    await loading.present();
    let auxRadicado = this.createFromForm()
    
    this.reclamosService.create(auxRadicado).subscribe(
      success => {
        loading.dismiss()
        if (success.status == 201) {
          this.mensajesError(' Registro realizado exitosamente ')
          setTimeout(() => {
            this.cerrarModal()
          }, 3000);
        } else {
          this.mensajesError(' No se ha generado el registro exitosamente, intenta nuevamente')
        }

      }, error => {
        loading.dismiss()
        this.mensajesError(' No se ha generado el registro exitosamente, intenta nuevamente')
        console.error(error)
      }
    )
  }

  private createFromForm(): Reclamo {
    return {
      ...new Reclamo(),
      id_radicado: this.radicado.id_radicado,
      fecha_creacion: new Date().toISOString(),
      reclamo : this.auxReclamo
    };
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
