import { JwtTokenServiceService } from './service/jwtTolenService.service';
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
      return true
    }else{
       this.router.navigate(['/login']);
       return false;
    }
  }

}
