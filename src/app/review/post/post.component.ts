import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,FormArray,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AppState } from '../../app.state';
import { APIURL } from '../../shared/shared.redirect';

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
  count = 0;
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
  upload (list: any, num: number ) {
    if (list.length <= 0) { return; }
    let f = list[0];
    console.log(num);
    let data = new FormData();
    let userID = 1;
    let archiveID = 2;
    let type = list[0].name.split('.');
    let filePath = 'http://localhost:3000/static/img/' + userID + '/' + archiveID + '/' + num + '.' + type[1];
    this.reviewForm.controls.selfContents.value[num].img = filePath;
    data.append('upfile', f, f.name);
    // ここから下にhttp
  }
  resId (i) {
    return i;
  }
  addSection () {
    this.selfContents.push(this.builder.group({
      id: this.count,
      title: '',
      body: '',
      img : ''
    }));
    this.count++;
  }

  ngOnInit () { this.addSection(); }
  get selfContents (): FormArray {
    return this.reviewForm.get('selfContents') as FormArray;
  }

  onSubmit () {
    const params = new URLSearchParams();
    params.set('mainTitle', this.reviewForm.controls.mainTitle.value);
    params.set('star', this.reviewForm.controls.star.value);
    params.set('category', this.reviewForm.controls.category.value);
    params.set('recommend', this.reviewForm.controls.recommend.value);
    params.set('improvement', this.reviewForm.controls.improvement.value);
    params.set('cateAnswer', this.reviewForm.controls.cateAnswer.value);
    params.set('selfContents', JSON.stringify(this.reviewForm.controls.selfContents.value));
    params.set('tag', JSON.stringify(this.reviewForm.controls.tag.value));

    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.post(APIURL + '/api/reviewupload', params, { withCredentials: true })
    .subscribe(
      response => {
        console.log(response.json());
        this.router.navigate(['/contents/review']);
      },
      error => {
        console.log(error);
      });
  }
}
