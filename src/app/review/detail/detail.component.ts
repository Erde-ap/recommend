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
  items;
  reviewid;
  avatar = './assets/user1/user1_profile.jpg';
  queryParams: any;
  user = {
    favorite: true,
    favoInt: 235
  };
  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http) {
  }

  toggleMenu (archive): void {
    archive.favorite = !archive.favorite;
    archive.favorite ? archive.favoInt++ : archive.favoInt--;
  }
  ngOnInit () {
    this._activatedRoute.queryParams.subscribe(
        params => {
          this.queryParams = params;
          this.reviewid = this.queryParams.id;
          this.onLoad();
        });
  }

  onLoad () {
    this.http.get('http://localhost:3000/api/reviewdetail?id=' + this.reviewid, { withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
        console.log(this.items);
        // レビューの一覧を取得して最新順にしてある。
      },
      error => {
        console.log(error);
      });
  }

}
