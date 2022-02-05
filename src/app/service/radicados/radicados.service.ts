import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radicado } from 'src/app/models/radicado.model';

@Injectable({
  providedIn: 'root'
})
export class RadicadosService {
  resourceUrl = 'http://localhost:4000/radicados';
  
  constructor(protected http: HttpClient) {}

  // create(sueno: Sueno): Observable<HttpResponse<Sueno>> {
  //   return this.http.post<Sueno>(this.resourceUrl, sueno, { observe: 'response' });
  // }

  // update(sueno: Sueno): Observable<HttpResponse<Sueno>> {
  //   return this.http.put(this.resourceUrl, sueno, { observe: 'response' });
  // }

  find(): Observable<Radicado[]> {
    return this.http.get<Radicado[]>(this.resourceUrl);
  }

  
  // delete(id: number): Observable<HttpResponse<any>> {
  //   return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  // }

}



