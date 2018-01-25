import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-registerconfirm',
  templateUrl: './registerconfirm.component.html',
  styleUrls: ['./registerconfirm.component.css']
})
export class RegisterconfirmComponent implements OnInit {

  private queryParams: any;
  private urlpath;

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private http: Http
  ) {
  }

  ngOnInit () {
    this._activatedRoute.queryParams.subscribe(
      params => {
        this.queryParams = params;
        this.urlpath = this.queryParams.url_path;
      });

    this.http.get('http://localhost:3000/api/register?=' + this.urlpath, { withCredentials: true })
        .subscribe(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            console.log(resp.user);
            // resp.userにidが格納されていなかったらログイン画面にリダイレクトするコードを書く↓。(resp.user == undefined || resp.user ==null)
          },
          error => {
            console.log(error);
          });
  }

}
