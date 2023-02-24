import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:7001/entretien/";
@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private http: HttpClient) { }

  CreateEntretien(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data);
  }

  GetEntretiens(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  DeleteEntretien(id: any): Observable<any> {
    return this.http.delete(AUTH_API + id);
  }

}
