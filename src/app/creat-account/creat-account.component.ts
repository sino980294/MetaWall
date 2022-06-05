import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users_Service } from '../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { UserSignUpViewModel } from '../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';

@Component({
  selector: 'app-creat-account',
  templateUrl: './creat-account.component.html',
  styleUrls: ['./creat-account.component.scss']
})
export class CreatAccountComponent implements OnInit {

  constructor(private userService: Users_Service,private router: Router) { }

  ngOnInit(): void {
  }
  public errorMessage:string = "";
  loginForm = new FormGroup({
    userName : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    userPhoto: new FormControl(''),
    gender : new FormControl('')
  })


  createAccount(){
    console.log(this.loginForm.value)
    this.userService.usersSignUpPost(this.loginForm.value).subscribe({
      next:(res:UserSignUpViewModel)=>{
        alert('創建帳戶成功');
        this.router.navigate(["/login"]);
      },
      error:(error)=>{
        this.errorMessage =  error.error.message
      }
    })
  }

}
