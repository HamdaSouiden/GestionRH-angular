import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
const AUTH_API = "http://localhost:7001/users/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  changeRole: BehaviorSubject<any> = new BehaviorSubject(true)
  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    // console.log(email,'email');

    return this.http.post(AUTH_API + 'login', data, httpOptions);
  }
  register(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data, httpOptions);
  }
  getUser() {
    return this.changeRole.asObservable()
  }
  setUser(value: boolean) {
    this.changeRole.next(value)
  }

  GetUsers(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  DeleteUser(id: any): Observable<any> {
    return this.http.delete(AUTH_API + id);
  }
}