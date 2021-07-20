import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service ';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService : BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    // let user = 'in28minutes';
    // let password = 'dummy';
    // let basicAuthHeaderString  = 'Basic ' + window.btoa(user + ':' + password);
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticationToken();
    let username = this.basicAuthenticationService.getAuthenticationUser();
    if(basicAuthHeaderString && username){
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }
    return next.handle(request);
  }
}
