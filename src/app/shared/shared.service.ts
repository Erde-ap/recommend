import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AppState } from '../app.state';

@Injectable()
export class SharedService {
  constructor (private http: Http, private router: Router, private appstate: AppState) {}

  logout () {
        // withCredentials: trueは必須.これがないとsessionが維持できない
        // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get('http://localhost:3000/api/logout', { withCredentials: true })
        .subscribe(
          response => {
            this.appstate.isLogin = false;
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
  }
}
