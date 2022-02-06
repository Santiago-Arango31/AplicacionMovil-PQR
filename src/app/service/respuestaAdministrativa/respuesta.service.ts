import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaAdm } from 'src/app/models/respuestaAdministrativa.model';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  resourceUrl = 'http://localhost:4000/respuesta';

  constructor(protected http: HttpClient) { }

  find(): Observable<HttpResponse<RespuestaAdm>> {
    return this.http.get<RespuestaAdm>(this.resourceUrl, { observe: 'response' });
  }

  findByRadicadoId(radicadoId: number): Observable<HttpResponse<RespuestaAdm>> {
    return this.http.get<RespuestaAdm>(`${this.resourceUrl}/${radicadoId}`, { observe: 'response' });
  }
}
