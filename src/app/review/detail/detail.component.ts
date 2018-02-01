import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APIURL } from '../../shared/shared.redirect';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,FormArray,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  items = {};
  reviewid;
  favdata = {
    favoInt: 0,
    favost: false
  };
  avatar = './assets/user1/user1_profile.jpg';
  queryParams: any;
  headers;
  commentForm;
  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http,
    private builder: FormBuilder) {
    this.commentForm = this.builder.group({
      value : new FormControl('', [
        Validators.required
      ])});
  }

  toggleMenu (archive): void {
    // archive.favorite = !archive.favorite;
    // archive.favorite ? archive.favoInt++ : archive.favoInt--;
    if (archive.favost === true) {
      this.favdel();
    }else if (archive.favost === false) {
      this.favadd();
    }
  }
  ngOnInit () {
    this.onLoad();
  }

  onLoad () {
    this.queryRead().subscribe((data) => {
      this.http.get(APIURL + '/api/reviewdetail?id=' + data, { withCredentials: true })
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
    this.http.post(APIURL + '/api/favst', { id: data }, { withCredentials: true })
    .subscribe(
      response => {
        if (response !== null) {
          this.favdata.favoInt = response.json().params;
          this.favdata.favost = response.json().status;
        }
      } ,
      error => {
        console.log(error);
      }
    );
  }

  favdel () {
    this.queryRead().subscribe((data) => {
      this.http.post(APIURL + '/api/favdel', { id: data }, { withCredentials: true })
    .subscribe(
      response => {
        this.onLoad_favsystem(data);
      } ,
      error => {
        console.log(error);
      }
    );
    });
  }

  favadd () {
    this.queryRead().subscribe((data) => {
      this.http.post(APIURL + '/api/favadd', { id: data }, { withCredentials: true })
    .subscribe(
      response => {
        this.onLoad_favsystem(data);
      } ,
      error => {
        console.log(error);
      }
    );
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
