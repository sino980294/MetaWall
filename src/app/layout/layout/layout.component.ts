import { Router } from '@angular/router';
import { JwtTokenServiceService } from './../../service/jwtTolenService.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private JwtTokenServiceService : JwtTokenServiceService,private router: Router) { }
public userName:string = ""
public userImage:string = ""
  ngOnInit() {
    this.getName()
  }
  public userInfo = {
    exp: 0,
    iat: 0,
    id: "",
    userName: ""
  }
  getName(){
    let token = this.JwtTokenServiceService.getAccessToken()
    if(token){
      this.userInfo =jwtDecode(token);
      this.userName = this.userInfo.userName;
    }

  }
  updateUserUrl(){
    this.userImage = '../../../assets/img/login/MetaWall.svg'
  }
  logOut(){
    this.JwtTokenServiceService.deleteAccessToken();
    this.router.navigate(['/login']);
  }
}
