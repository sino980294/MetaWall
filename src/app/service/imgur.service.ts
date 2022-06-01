import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, ReplaySubject, Subject, switchMap } from 'rxjs';
import { Credentials } from 'imgur/lib/common/types';
import ImgurClient from 'imgur';

@Injectable({
  providedIn: 'root'
})
export class ImgurService implements OnInit {

constructor(private http:HttpClient) { }


    a:Credentials = {
        clientId: environment.imgurAccount,
        clientSecret: environment.imgurPassword,
        refreshToken: environment.refreshToken
    }
  ngOnInit(): void {

  }
  imurgurPipe(imgur$:Subject<File>){
    const client = new ImgurClient(this.a);
    return imgur$
    .pipe(switchMap(file=> this.convertFile(file)))
    .pipe(concatMap( base64 => client.upload({
        image: base64,
        type: 'base64',
        album: environment.imgurId
      })
    ))
  }
async pushImg(file:File){


}
convertFile(file : File) : Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (event) => result.next(btoa(event?.target?.result?.toString()??''));
  return result;
}
}

