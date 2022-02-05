import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RadicadosService } from '../service/radicados/radicados.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private radicadosService : RadicadosService,
    protected http: HttpClient
  ) {}

  ngOnInit(){
    console.log('hola mundo')
    this.radicadosService.find().subscribe(
      success => {
        console.log('success', success)
      }, error => {
        console.error(error)
      }

    )
  }

}
