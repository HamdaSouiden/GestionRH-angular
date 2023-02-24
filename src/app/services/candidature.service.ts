import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:7001/candidature/";

const AUTH_API1 = "http://localhost:7001/uploadcv/";
@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  constructor(private http: HttpClient) { }

  GetCandidatures(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  AddCandidature(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data);
  }

  UploadCv(data: any): Observable<any> {
    return this.http.post(AUTH_API1 + 'upload', data);
  }


  DeleteCandidature(id: any): Observable<any> {
    return this.http.delete(AUTH_API + id);
  }
  
}
