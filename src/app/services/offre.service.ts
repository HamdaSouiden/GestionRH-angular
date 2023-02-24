import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = "http://localhost:7001/offre/";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http: HttpClient) { }

  GetOffres(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  AddOffre(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data);
  }

  UpdateOffre(data:any, id:any): Observable<any> {
    return this.http.put(AUTH_API + id, data);
  }

  DeleteOffre(id: any): Observable<any> {
    return this.http.delete(AUTH_API + id);
  }

  GetOffreById(id: any): Observable<any> {
    return this.http.get(AUTH_API + id);
  }
}
