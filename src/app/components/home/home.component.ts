import { Component, OnInit } from '@angular/core';
import { offre } from 'models/offre';
import { OffreService } from 'src/app/services/offre.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offres: offre[] = [];
  Data: any;
  private roles: string[] = [];
  isLoggedIn = true;
  showAdminBoard = false;
  showCandidatBoard = false;
  constructor(private offreserv: OffreService, private router: Router, private tokenStorageService: TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.loggedUser()
    this.userService.getUser().subscribe(()=>{console.log('fffff');
    this.loggedUser()})
    this.getallOffre();
  }


  getallOffre(){
    this.offreserv.GetOffres()
    .subscribe( (res) => {
      this.Data = res.data;
    });
  }
  loggedUser(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;
      this.showAdminBoard = this.roles.includes('admin');
      this.showCandidatBoard = this.roles.includes('candidat');
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['home']);
  }

  }

