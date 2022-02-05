import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  resourceUrl = 'http://localhost:4000/usuarios';

  constructor(protected http: HttpClient) { }

  find(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.resourceUrl, { observe: 'response' });
  }
  
}
