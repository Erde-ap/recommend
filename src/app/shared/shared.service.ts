import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class SharedService  {
    constructor(private http:Http){}

    check_session() {
        this.http.get('http://localhost:3000/api/checksession',  { withCredentials: true})
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });  
      }
      onSubmit(){
        //withCredentials: trueは必須これがないとsessionが維持できない
        //angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
        this.http.get('http://localhost:3000/api/logout',  { withCredentials: true})
        .subscribe(
          response => {
            console.log(response)
          },
          error => {
            console.log(error)
          }
        );
      }
}
