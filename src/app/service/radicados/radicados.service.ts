import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radicado } from 'src/app/models/radicado.model';

@Injectable({
  providedIn: 'root'
})
export class RadicadosService {
  resourceUrl = 'http://localhost:4000/radicados';

  constructor(protected http: HttpClient) { }

  findAll(): Observable<HttpResponse<Radicado[]>> {
    return this.http.get<Radicado[]>(this.resourceUrl, { observe: 'response' });
  }

  findByUserId(userId: Number): Observable<HttpResponse<Radicado[]>> {
    return this.http.get<Radicado[]>(`${this.resourceUrl}/${userId}`, { observe: 'response' });
  }

  create(radicado: Radicado): Observable<HttpResponse<Radicado>> {
    return this.http.post<Radicado>(this.resourceUrl, radicado, { observe: 'response' });
  }

}



