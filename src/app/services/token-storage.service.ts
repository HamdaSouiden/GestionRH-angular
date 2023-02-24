import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    localStorage.clear();
  }
  public saveToken(token: string): void {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }
  public getToken(): string | null {
    return localStorage.getItem("token");
  }
  public saveUser(user: any): void {
    localStorage.removeItem("token");
    localStorage.setItem("token", JSON.stringify(user));
  }
  public getUser(): any {
    const user = localStorage.getItem("token");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
