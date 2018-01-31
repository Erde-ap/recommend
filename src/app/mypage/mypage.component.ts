import { Component, Inject, Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Http } from '@angular/http';
import { APIURL } from '../shared/shared.redirect';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [SharedService]
})
@Injectable()
export class MypageComponent {
  items;
  avatar = './assets/user1/user1_profile.jpg';
  name = '';
  user = {};
  archives = [];

  constructor (private sharedservice: SharedService, private http: Http) {
    this.onLoad();
  }

  onLoad () {
    this.http.get(APIURL + '/api/mypage', { withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
        this.user = this.items;
        this.archives = this.items.review;
      },
      error => {
        console.log(error);
      });
  }

}
