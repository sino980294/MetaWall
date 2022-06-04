import { JwtTokenServiceService } from './../service/jwtTolenService.service';
import { TpAuth_Service } from './../app-info/typescript-angular-client-generated/typescript-angular-client/api/tpAuth_.service';
import { Router } from '@angular/router';
import { Users_Service } from './../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faGoogle,faFacebookSquare } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: Users_Service, private router: Router,private TpAuth_Service:TpAuth_Service,
    private JwtTokenServiceService:JwtTokenServiceService) { }
  public errorMessage: string = "";
  public faGoogle = faGoogle
  public faFacebook = faFacebookSquare
  ngOnInit() {
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  onSubmit() {
    console.log(this.loginForm.value)
    this.userService.usersLoginPost(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.JwtTokenServiceService.setToken(res.data.token)
        this.router.navigate(['/index']);
      },
      error: (error) => {
        this.errorMessage = error.error.message
        console.log(error.error.message)
      }
    })
  }
  googleLogin(){
    this.TpAuth_Service.tpAuthGoogleGet().subscribe(res=>{
console.log(res)

    })
  }
}
