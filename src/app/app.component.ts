import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-rh';
  private roles: string[] = [];
  isLoggedIn = true;
  showAdminBoard = false;
  showCandidatBoard = false;
  constructor(private router: Router, private tokenStorageService: TokenStorageService, private userService:UserService) { }
  ngOnInit(): void {
    this.loggedUser()
    this.userService.getUser().subscribe(()=>{console.log('fffff');
    this.loggedUser()})
  }

  loggedUser(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;
      this.showAdminBoard = this.roles.includes('admin');
      this.showCandidatBoard = this.roles.includes('candidat');
    }else{
      this.showAdminBoard = false;
      this.showCandidatBoard = false
    }
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['home']);
    this.userService.setUser(true);
  }

}


