import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from 'src/app/models/reclamo.model';

@Injectable({
  providedIn: 'root'
})

export class ReclamosService {
  resourceUrl = 'http://localhost:4000/reclamos';

  constructor(protected http: HttpClient) { }

  find(): Observable<HttpResponse<Reclamo>> {
    return this.http.get<Reclamo>(this.resourceUrl, { observe: 'response' });
  }

  findByRadicadoId(radicadoId: number): Observable<HttpResponse<Reclamo>> {
    return this.http.get<Reclamo>(`${this.resourceUrl}/${radicadoId}`, { observe: 'response' });
  }

  create(reclamo: Reclamo): Observable<HttpResponse<Reclamo>> {
    return this.http.post<Reclamo>(this.resourceUrl, reclamo, { observe: 'response' });
  }
}
