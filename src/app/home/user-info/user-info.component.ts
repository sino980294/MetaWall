import { Users_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { JwtTokenServiceService } from 'src/app/service/jwtTolenService.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
public pageLabel :string = ""
userInfo !: UserInfo;
userInfoSendError:string = '';
PasswordSendError:string = ''
userInfoForm = new FormGroup({
  userName: new FormControl(''),
  userPhoto: new FormControl(''),
  gender: new FormControl('male')
})
passwordForm = new FormGroup({
  password: new FormControl(''),
  confirmNewPassword:new FormControl('')
})
  constructor(private activatedRoute: ActivatedRoute,private JwtTokenService: JwtTokenServiceService,
    private UserService : Users_Service,private location : Location) { }

  ngOnInit(): void {
    this.getPageLabel()
    this.getUserInfo()
    this.userInfoForm.setValue({
      userName: this.userInfo.userName,
      userPhoto: this.userInfo.userPhoto,
      gender: 'male'
    })
  }
getPageLabel(){
  this.activatedRoute.queryParams.subscribe(
    params => {
      this.pageLabel = params['label']
    }
  );
}
getUserInfo() {
  this.userInfo = this.JwtTokenService.getUserInfo() ?? new UserInfo()
}
updateMyUserUrl() {
  this.userInfo.userPhoto = './assets/img/login/MetaWall.svg';
}

changeNavLink(param:string){
  if('label=' + param != this.location.path().split('?')[1]){
    this.location.go(this.location.path().split('?')[0],'label='+param);
  }
}
sendUserInfoChange(){
this.UserService.usersPatchProfilePatch(this.userInfoForm.value).subscribe({
  next:(res)=>{
    console.log(res)
    this.userInfoForm.setValue({
      userName: res.data.userName,
      userPhoto:  res.data.userPhoto,
      gender: res.data.gender
    })
    this.userInfoSendError = '設定成功'
  },
  error:(err)=>{
    this.userInfoSendError =  err.error.message
  }
})
}
sendPasswordChange(){
  this.UserService.usersUpdatePasswordPatch(this.passwordForm.value).subscribe({
next:(res)=>{
  this.passwordForm.setValue({
    password: '',
    confirmNewPassword:  '',

  })
  this.PasswordSendError = '設定成功'
},
error:(err)=>{
  console.log(err)
  this.PasswordSendError = err.error.message
}
  })
}
}