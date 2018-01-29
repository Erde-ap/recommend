import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,FormArray,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AppState } from '../../app.state';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  responseJson = '';
  replace= RegExp(/"/,'g');
  reviewForm: FormGroup;
  matcher = new MyErrorStateMatcher();
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

  constructor (private http: Http,private builder: FormBuilder, private router: Router, private appstate: AppState) {
    this.reviewForm = this.builder.group({
      mainTitle : new FormControl('', [
        Validators.required
      ]),
      star : new FormControl('', []),
      category : new FormControl('', [
        Validators.required
      ]),
      recommend : new FormControl('', [
        Validators.required
      ]),
      improvement : new FormControl('', [
        Validators.required
      ]),
      cateAnswer : new FormControl('', [
        Validators.required
      ]),
      selfContents : this.builder.array([]),
      tag : new FormControl('', [])
    });
  }

  addSection () {
    this.selfContents.push(this.builder.group({
      title: '',
      body: ''
    }));
  }

  ngOnInit () { this.addSection(); }
  get selfContents (): FormArray {
    return this.reviewForm.get('selfContents') as FormArray;
  }

  onSubmit () {
    const params = new URLSearchParams();
    params.set('name', this.reviewForm.controls.mainTitle.value);
    params.set('mainDetail', this.reviewForm.controls.mainDetail.value);
    console.log(this.reviewForm.value);
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.post('http://localhost:3000/api/レビューの投稿先', params, { withCredentials: true })
    .subscribe(
      response => {
        this.responseJson = JSON.stringify(response.json().response);
        console.log(response.json().code);
        if (response.json().code === 23) {
          this.appstate.isLogin = true;
          this.router.navigate(['/mypage']);
        }else if (response.json().code === 24) {
          this.appstate.isLogin = false;
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.log(error);
      });
  }
}
