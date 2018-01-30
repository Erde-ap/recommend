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
  favorite = {
    favoInt: '0',
    favost: false
  };
  avatar = './assets/user1/user1_profile.jpg';
  queryParams: any;
  headers;
  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http) {
  }

  toggleMenu (archive): void {
    archive.favorite = !archive.favorite;
    archive.favorite ? archive.favoInt++ : archive.favoInt--;
  }

  ngOnInit () {
    this.onLoad();
  }

  onLoad () {
    this.queryRead().subscribe((data) => {
      this.http.get('http://localhost:3000/api/reviewdetail?id=' + data, { withCredentials: true })
      .subscribe(
        response => {
          this.items = response.json();
          this.onLoad_favsystem(data);
          // レビューの一覧を取得して最新順にしてある。
        },
        error => {
          console.log(error);
        });
    });
  }

  onLoad_favsystem (data) {
    let params = new URLSearchParams();

    params.set('id', data);
    this.http.post('http://localhost:3000/api/favst', params, { withCredentials: true })
    .subscribe(
      response => {
        this.favorite.favoInt = response.json().params;
        this.favorite.favost = response.json().status;
      } ,
      error => {
        console.log(error);
      }
    );
  }

  queryRead (): Observable<string> {
    return this._activatedRoute.queryParams.map(
      params => {
        let queryParams = params;
        return queryParams.id;
      });
  }
}
