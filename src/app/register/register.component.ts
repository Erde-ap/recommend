import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email= '';
  uid= '';
  password= '';
  password_confirm= '';
  name= '';
  date= '';
  selected = 'male';
  syoukai= 'ここに自己紹介を記入してください。';

  data = [
    { label: '男性', value: 'male' },
    { label: '女性', value: 'female' }
  ];
  constructor (private http: Http) {}

  onSubmit () {
    let params = new URLSearchParams();
    params.set('email', this.email);
    params.set('uid', this.uid);
    params.set('password', this.password);
    params.set('name', this.name);
    params.set('date', this.date);
    params.set('sex', this.selected);
    params.set('syoukai', this.syoukai);

    this.http.post('http://localhost:3000/api/register', params, { withCredentials: true })
    .subscribe(
      data => console.log(data.json()),
      error => console.log(error)
    );
  }
}
