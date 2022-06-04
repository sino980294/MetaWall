import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserInfo } from '../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenServiceService {

  constructor(private Router:Router) { }
  getAccessToken() {
    return localStorage.getItem("token");
  }
  deleteAccessToken(){
    if(this.getAccessToken()){
      localStorage.removeItem("token");
    }
  }
  getUserInfo():UserInfo|null{
    try{


    let token = this.getAccessToken();
    if(token){
     return jwtDecode(token);
    }else{
      return null
    }
  }
  catch{
    this.deleteAccessToken();
    this.Router.navigate(['/login']);
    return null
  }
  }
  setToken(token:string){
    localStorage.setItem("token", token);
  }
}
