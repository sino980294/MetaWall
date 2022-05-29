import { Router } from '@angular/router';
import { JwtTokenServiceService } from './../../service/jwtTolenService.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserInfo } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { faBell ,faThumbsUp} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private JwtTokenServiceService : JwtTokenServiceService,private router: Router) { }
public userName:string = ""
public userImage:string = ""
public faBell = faBell;
public faThumbsUp = faThumbsUp;
  ngOnInit() {
    this.getName()
  }
  public userInfo !:UserInfo|null
  getName(){
    this.userInfo = this.JwtTokenServiceService.getUserInfo() ;
    if(this.userInfo){
      this.userName  = this.userInfo.userName
    }
  }
  updateUserUrl(){
    this.userImage = './assets/img/login/MetaWall.svg'
  }
  logOut(){
    this.JwtTokenServiceService.deleteAccessToken();
    this.router.navigate(['/login']);
  }
}
