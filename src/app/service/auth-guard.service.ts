import { JwtTokenServiceService } from './jwtTolenService.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(private JwtTokenServiceService: JwtTokenServiceService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.JwtTokenServiceService.getAccessToken() != null){
      console.log(true)
      return true
    }else{
      const token :string = route.queryParams['t']
      console.log(token)
      if(token){
        this.JwtTokenServiceService.setToken(token)
        this.router.navigate(['/index']);
      }
      console.log(123);
       this.router.navigate(['/login']);
       return false;
    }
  }

}
