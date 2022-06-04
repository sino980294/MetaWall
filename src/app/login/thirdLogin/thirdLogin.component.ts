import { JwtTokenServiceService } from './../../service/jwtTolenService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thirdLogin',
  templateUrl: './thirdLogin.component.html',
  styleUrls: ['./thirdLogin.component.scss']
})
export class ThirdLoginComponent implements OnInit {

  constructor(private router:Router,private ActivatedRoute:ActivatedRoute,
    private JwtTokenServiceService:JwtTokenServiceService) { }

  ngOnInit() {
    this.getPageLabel()
  }
getPageLabel() {
    this.ActivatedRoute.queryParams.subscribe(
      params => {
        let token = params['t']
        if(token){
            this.JwtTokenServiceService.setToken(token)
            this.router.navigate(["/index"])
        }else{
          this.router.navigate(["/login"])
        }
      }
    );
  }
}
