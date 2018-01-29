import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { } from '';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  avatar = './assets/user1/user1_profile.jpg';
  items = [{ i: 1 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 6 },{ i: 7 },{ i: 8 },{ i: 9 },{ i: 10 },{ i: 11 },{ i: 12 },{ i: 13 },{ i: 14 },{ i: 15 },{ i: 16 },{ i: 17 },{ i: 18 },{ i: 19 },{ i: 20 },{ i: 21 },{ i: 22 },{ i: 23 },{ i: 24 },{ i: 25 },{ i: 26 },{ i: 27 },{ i: 28 }];
  constructor (private http: Http) {
    this.onLoad();
  }

  onLoad () {
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get('http://localhost:3000/api/reviewtop', { withCredentials: true })
    .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        console.log(error);
      });
  }
}
