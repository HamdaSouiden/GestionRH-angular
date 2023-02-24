import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;

  constructor() { }

  // login() {
  //   this.isLogin = true;
  //   localStorage.setItem('role', 'admin');
  //   localStorage.setItem('role', 'candidat');
  // }

  // logout() {
  //   this.isLogin = false;
  //   this.roleAs = '';
  //   localStorage.setItem('STATE', 'false');
  //   localStorage.setItem('ROLE', '');
  //   return of({ success: this.isLogin, role: '' });
  // }

  isLoggedIn() {
    return !!localStorage.getItem('token');

  }

  // getRole() {
  //   this.roleAs = localStorage.getItem('ROLE');
  //   return this.roleAs;
  // }

}