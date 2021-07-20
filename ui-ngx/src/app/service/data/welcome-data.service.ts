import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constant';

export class HelloWorldBean{
  constructor(public message : string){

  }
}
@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http : HttpClient
  ) { }

  executeHelloWorldBean(){
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
  }
  executeHelloWorldServiceWithParameterName(name : string){
    let basicAuthHeaderString = this.createBasicAuthenticationHeader();
    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    }
    );
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`
    // ,{headers}
    );
  }
  createBasicAuthenticationHeader(){
    let user = 'in28minutes';
    let password = 'dummy';
    let basicAuthHeaderString  = 'Basic ' + window.btoa(user + ':' + password);
    return basicAuthHeaderString;
  }
}
