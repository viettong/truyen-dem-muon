import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelloWorldBean } from './data/welcome-data.service';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constant';

export const AUTHENTICATION_USER = 'authenticateUser';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})



export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }




  executeJWTAuthenticationService(username:string,password:string){

    let basicAuthHeaderString  = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    }
    );
    return this.http.post<any>(`${API_URL}/authenticate`,{username,password}).pipe(
      map(
        (data: any)=> {
          sessionStorage.setItem(AUTHENTICATION_USER,username);
          sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
          return data;
        }
      )
    );
  }





  
  executeAuthenticationService(username:string,password:string){

    let basicAuthHeaderString  = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    }
    );
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{headers}).pipe(
      map(
        (data: any)=> {
          sessionStorage.setItem(AUTHENTICATION_USER,username);
          sessionStorage.setItem(TOKEN,basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticationUser(){
    return sessionStorage.getItem(AUTHENTICATION_USER);
  }
  getAuthenticationToken(){
    return sessionStorage.getItem(TOKEN);
  }
  logout(){
    sessionStorage.removeItem(AUTHENTICATION_USER);
    sessionStorage.removeItem(TOKEN);
  }


}

export class AuthenticationBean{
  constructor(public message : string){

  }
}
