import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service ';
import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username='in28minutes'
  password = ''
  errorMessage = 'invalid'
  invalidLogin = false;
  x : any;
  //Router
  //Angular.GiveMeRouter
  //Dependency Injection
  constructor(private router : Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private basciAuthenticationService  : BasicAuthenticationService,
    private todoService : TodoDataService) { }

  ngOnInit(): void {
    this.todoService.fetchChapterData("id").subscribe(
      data =>{
        this.x = data;
        console.log(data);
      }
    );
  }
  handleLogin(){
    console.log(this.username);
    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      this.invalidLogin=false;
      sessionStorage.setItem('authenticateUser',this.username);
      this.router.navigate(['welcome',this.username]);
    }
    else{
      this.invalidLogin = true;
    }

  }
  handleBasicLogin(){
    this.router.navigate(['welcome',this.username]);
    this.basciAuthenticationService.executeAuthenticationService(this.username,this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome',this.username]);
      }
    )
  }
  handleJWTLogin(){
    this.router.navigate(['welcome',this.username]);
    this.basciAuthenticationService.executeJWTAuthenticationService(this.username,this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome',this.username]);
      }
    )
  }
}
