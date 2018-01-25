import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class SharedService {
  constructor (private http: Http) {}

  check_session () {
    this.http.get('http://localhost:3000/api/checksession', { withCredentials: true })
        .subscribe(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            console.log(resp.user);
            // resp.userにidが格納されていなかったらログイン画面にリダイレクトするコードを書く↓。(resp.user == undefined || resp.user ==null)
          },
          error => {
            console.log(error);
          });
  }

  logout () {
        // withCredentials: trueは必須.これがないとsessionが維持できない
        // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get('http://localhost:3000/api/logout', { withCredentials: true })
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
  }
}
