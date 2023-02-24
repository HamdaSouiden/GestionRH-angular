import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deparetment } from 'models/deparetment';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:7001/deparetment/";
@Injectable({
  providedIn: 'root'
})
export class DeparetmentService {
    
  constructor(private http: HttpClient) { }

  GetDeparetments(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  AddDeparetment(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data);
  }

  UpdateDeparetment(data:any, id:any): Observable<any> {
    return this.http.put(AUTH_API + id, data);
  }

  DeleteDeparetment(id: any): Observable<any> {
    return this.http.delete(AUTH_API + id);
  }

  GetDeparetmentById(id: any): Observable<any> {
    return this.http.get(AUTH_API + id);
  }

}
