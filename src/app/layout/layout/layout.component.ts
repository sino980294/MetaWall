import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { Pay_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/pay_.service';
import { Router } from '@angular/router';
import { JwtTokenServiceService } from './../../service/jwtTolenService.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { PostDatapostsViewModel, UserInfo } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { faBell ,faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private JwtTokenServiceService : JwtTokenServiceService,private router: Router,
    private Pay_Service:Pay_Service,private Posts_Service:Posts_Service) { }
public userName:string = ""
public userImage:string = ""
public userIsCarrier:boolean = false;
public faBell = faBell;
public faThumbsUp = faThumbsUp;

  ngOnInit() {
    this.getName()
  }
  public userInfo !:UserInfo|null
  getName(){
    this.userInfo = this.JwtTokenServiceService.getUserInfo() ;
    console.log(this.userInfo)
    if(this.userInfo){
      this.userName  = this.userInfo.userName
      this.userImage  = this.userInfo.userPhoto
      this.userIsCarrier = this.userIsCarrier
    }
  }
  updateUserUrl(){
    this.userImage = './assets/img/login/MetaWall.svg'
  }
  logOut(){
    this.JwtTokenServiceService.deleteAccessToken();
    this.router.navigate(['/login']);
  }
  addCarrier(){
  this.Pay_Service.payGet().subscribe(res=>{

const div = document.createElement('div');
div.innerHTML =res.resHTML;
console.log(div)
const form = div.getElementsByTagName('FORM')[0] as unknown as HTMLFormElement
console.log(form)
form.setAttribute('target','_blank');
document.body.appendChild(div)
form.submit()
document.body.removeChild(div)
})
  }
  getFollowers(){
    this.router.navigate(['/following', { 'id': this.userInfo?.id }])

  }

}
