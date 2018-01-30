import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  items = {};
  reviewid;
  avatar = './assets/user1/user1_profile.jpg';
  queryParams: any;
  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http) {
    this.onLoad();
  }

  toggleMenu (archive): void {
    archive.favorite = !archive.favorite;
    archive.favorite ? archive.favoInt++ : archive.favoInt--;
  }

  ngOnInit () {
    this.onLoad();
  }

  onLoad () {
    console.log(this.queryRead());
    this.http.get('http://localhost:3000/api/reviewdetail?id=', { withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
        // レビューの一覧を取得して最新順にしてある。
      },
      error => {
        console.log(error);
      });
  }

  queryRead (): Observable<string> {
    return this._activatedRoute.queryParams.map(
      params => {
        let queryParams = params;
        return queryParams.id;
      });
  }

}
