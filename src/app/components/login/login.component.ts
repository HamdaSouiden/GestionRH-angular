import { ThisReceiver, Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private userService: UserService, private tokenStorage: TokenStorageService,private router:Router) { }
  ngOnInit(): void {

  }
  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  })
  onSubmit(): void {
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        console.log(data,'data');
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       this.userService.setUser(true)
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    if(this.loginForm.valid){
      // localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NTk4OTA0LCJleHAiOjE2NDk2ODUzMDR9.x4q2nr_Fv22ptVN2RAeVUWxqii1NV_o302eP5sYoXdo")
      this.loginForm.reset();
    }
  }
  reloadPage(): void {
   this.router.navigate(['/'])
  }

  Singup(){
    this.router.navigate(["register"])
  }

}
