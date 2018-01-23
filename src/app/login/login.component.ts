import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FormControl,FormGroupDirective,NgForm,Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  constructor (private http: Http) {}

  onSubmit () {
    const params = new URLSearchParams();
    params.set('name', this.name);
    params.set('password', this.password);

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.post('http://localhost:3000/api/login', params, { withCredentials: true })
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
