import { Subject } from 'rxjs';
import { Users_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { premiumMemberInfo, UserInfo } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { JwtTokenServiceService } from 'src/app/service/jwtTolenService.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ImgurService } from 'src/app/service/imgur.service';
import { ImgurClient } from 'imgur';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public pageLabel: string = ""
  userInfo !: UserInfo;
  userInfoSendError: string = '';
  PasswordSendError: string = ''
  public premiumMemberInfo!: premiumMemberInfo
  imgur$ !: Subject<File>
  userInfoForm = new FormGroup({
    userName: new FormControl(''),
    userPhoto: new FormControl(''),
    gender: new FormControl('male')
  })
  passwordForm = new FormGroup({
    password: new FormControl(''),
    confirmNewPassword: new FormControl('')
  })
  constructor(private activatedRoute: ActivatedRoute, private JwtTokenService: JwtTokenServiceService,
    private UserService: Users_Service, private location: Location,
    private ImgurService: ImgurService) { }

  ngOnInit(): void {
    this.JwtTokenService.getNewToken()
    this.getPageLabel()
      this.getPremiumInfo()
    this.getUserInfo()
    this.userInfoForm.patchValue({
      userName: this.userInfo.userName,
      userPhoto: this.userInfo.userPhoto,
      gender: this.userInfo.gender
    })
    this.InitImurgurPipe()

  }
  getPremiumInfo(){
    this.UserService.usersOwnProfileGet().subscribe(res=>{
console.log(res)
this.premiumMemberInfo = res


    })
  }
  InitImurgurPipe() {
    this.imgur$ = new Subject();
    this.ImgurService.imurgurPipe(this.imgur$).subscribe(res => {
      if (res.success) {
        this.userInfo.userPhoto = res.data.link;
        this.userInfoForm.patchValue({ userPhoto: res.data.link })
      } else {
        alert('????????????')
      }
    })
  }
  getPageLabel() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.pageLabel = params['label']
      }
    );
  }

  changeUserPhoto($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    console.log(element)
    if (fileList) {
      this.imgur$.next(fileList[0])
    }
    console.log(this.userInfo)

  }
  getUserInfo() {
    this.userInfo = this.JwtTokenService.getUserInfo() ?? new UserInfo()

    console.log(this.userInfo)
  }
  updateMyUserUrl() {
    this.userInfo.userPhoto = './assets/img/login/MetaWall.svg';
  }

  changeNavLink(param: string) {
    if ('label=' + param != this.location.path().split('?')[1]) {
      this.location.go(this.location.path().split('?')[0], 'label=' + param);
    }
  }
  sendUserInfoChange() {
    this.UserService.usersPatchProfilePatch(this.userInfoForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.userInfoForm.patchValue({
          userName: res.data.userName,
          userPhoto: res.data.userPhoto,
          gender: res.data.gender
        })
        alert('????????????')
        this.JwtTokenService.getNewToken();
        window.location.reload();
      },
      error: (err) => {
        this.userInfoSendError = err.error.message
      }
    })
  }
  sendPasswordChange() {
    this.UserService.usersUpdatePasswordPatch(this.passwordForm.value).subscribe({
      next: (res) => {
        this.passwordForm.patchValue({
          password: '',
          confirmNewPassword: '',

        })
        alert('????????????')
        this.JwtTokenService.getNewToken();
        window.location.reload();
      },
      error: (err) => {
        console.log(err)
        this.PasswordSendError = err.error.message
      }
    })
  }
}
