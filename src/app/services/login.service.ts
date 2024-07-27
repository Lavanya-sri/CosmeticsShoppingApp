import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public headerStatus = localStorage.getItem('headerStatus');
  public loginStatus : boolean =   this.headerStatus == 'True' ? true : false;

  url = 'http://127.0.0.1:5000/users'

  constructor(private http:HttpClient) { }


  // add item in cart
  login(body:any){
    return this.http.post(this.url+'/login',body);
  }

   // add item in cart
   signUp(body:any){
    return this.http.post(this.url+'/register',body);
  }
}
