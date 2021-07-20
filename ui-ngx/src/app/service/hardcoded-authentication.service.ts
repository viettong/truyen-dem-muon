import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username : string,password : string){
    if(username==="in28minutes" && password==='dummy'){
      return true;
    }
    return false;
  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user === null);
  }
  logout(){
    sessionStorage.removeItem('authenticateUser');
  }
}
