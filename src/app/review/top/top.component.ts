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
  searched;
  avatar = './assets/user1/user1_profile.jpg';
  // items = [{ i: 1 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 5 },{ i: 2 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 4 },{ i: 3 },{ i: 4 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 2 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 }];
  items;
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
    this.http.get('http://localhost:3000/api/reviewtop', { withCredentials: true })
    .subscribe(
      response => {
        // レビューの一覧を取得して最新順にしてある。
        this.items = response.json();
        console.log(this.searched);
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_keyword () {
    const ps = new URLSearchParams();
    ps.set('keyword', this.cateSeachForm.controls.keyword.value);

    this.http.get('http://localhost:3000/api/searchkeyword', { params: ps , withCredentials: true })
    .subscribe(
      response => {
        this.searched = response.json();
        console.log(this.searched);
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_tag () {
    // const ps = new URLSearchParams();
    // ps.set('tag', this.cateSeachForm.controls.tag.value);

    // this.http.get('http://localhost:3000/api/searchtag', { params: ps , withCredentials: true })
    // .subscribe(
    //   response => {
    //     console.log(response.json());
    //     this.searched = response.json();
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  onSubmit_cate () {
  //   const ps = new URLSearchParams();
  //   ps.set('cate', this.cateSeachForm.controls.categories.value);

  //   this.http.get('http://localhost:3000/api/searchcate', { params: ps , withCredentials: true })
  // .subscribe(
  //     response => {
  //       console.log(response.json());
  //       this.searched = response.json();
  //     },
  //     error => {
  //       console.log(error);
  //     });
  }
}
