import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private http:Http){}

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