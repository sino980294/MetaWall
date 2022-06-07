import { Users_Service } from './../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserInfo } from '../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenServiceService {

  constructor(private Router:Router,private Users_Service:Users_Service) { }
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
  getNewToken(){
this.Users_Service.usersRefreshTokenPost().subscribe(res=>{
  if(res?.data?.token){
    this.setToken(res.data.token)
  }
})
  }
}
