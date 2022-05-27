import { Injectable } from '@angular/core';

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
}
