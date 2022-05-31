import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenServiceService } from './jwtTolenService.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

constructor(private JwtTokenServiceService : JwtTokenServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer' + ' ' + this.JwtTokenServiceService.getAccessToken()
      }
    });
    console.log(newRequest)
    return next.handle(newRequest);

    throw new Error('Method not implemented.');
  }

}
