import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserInfo } from '../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenServiceService {

  constructor() { }
  getAccessToken() {
    return localStorage.getItem("token");
  }
  deleteAccessToken(){
    if(this.getAccessToken()){
      localStorage.removeItem("token");
    }
  }
  getUserInfo():UserInfo|null{
    let token = this.getAccessToken();
    if(token){
     return jwtDecode(token);
    }else{
      return null
    }
  }
}
