import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name = '';
  password = '';

  constructor (private http: Http) {}

  onSubmit () {
    const params = new URLSearchParams();
    params.set('name', this.name);
    params.set('password', this.password);
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.post('http://localhost:3000/api/login', params, { withCredentials: true })
    .subscribe(
      response => {
        const resobj = response.json();
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
