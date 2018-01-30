import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  items = [];
  reviewid;
  avatar = './assets/user1/user1_profile.jpg';
  queryParams: any;
  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.reviewid = this.queryParams.id;
      this.onLoad();
    });
  }

  ngOnInit () {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.reviewid = this.queryParams.id;
      this.onLoad();
    });
  }

  onLoad () {
    const ps = new URLSearchParams();
    ps.set('id', this.reviewid);

    this.http.post('http://localhost:3000/api/reviewdetail', { params: ps } ,{ withCredentials: true })
    .subscribe(
      response => {
        console.log(response.json());
        // レビューの一覧を取得して最新順にしてある。
      },
      error => {
        console.log(error);
      });
  }

}
