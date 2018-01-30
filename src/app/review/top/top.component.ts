import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,FormArray,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  avatar = './assets/user1/user1_profile.jpg';
  items = [{ i: 1 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 5 },{ i: 2 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 4 },{ i: 3 },{ i: 4 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 2 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 }];
  categories = [
    '本・コミック・雑誌',
    'ゲーム',
    'ミュージック',
    '映像作品(映画・アニメ・ドラマ)',
    '電化製品',
    'ヘルス&ビューティー',
    '食品・飲料・お酒',
    '車・バイク',
    '家庭用品・家具',
    '小物・雑貨',
    'おもちゃ・ホビー',
    '衣類',
    'スポーツ・アウトドア',
    'イベント',
    'その他'
  ];
  cateSeachForm: FormGroup;

  constructor (private http: Http,private builder: FormBuilder) {
    this.onLoad();
    this.cateSeachForm = this.builder.group({
      category : new FormControl('', []),
      keyword : new FormControl('', []),
      tag : new FormControl('', [])
    });
  }

  // 星の数を表示するためのメソッド
  createstar = num => new Array(num);

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

  onSubmit_tag () {
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get('http://localhost:3000/api/searchtag', { withCredentials: true })
    .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_cate () {
    const params = new URLSearchParams();
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get('http://localhost:3000/api/searchcate', params: params, { withCredentials: true })
    .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        console.log(error);
      });
  }
}
