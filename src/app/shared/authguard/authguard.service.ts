import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';

@Injectable()
export class AuthguardService implements CanActivate {
  isLogin: boolean;
  constructor (private router: Router, private http: Http, private appstate: AppState) {
    this.isLogin = appstate.isLogin;
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // テスト用に認証無効
    this.isLogin = this.appstate.isLogin;
    this.checksession();
    if (this.isLogin === true) {
      return true;
    }else if (this.isLogin === false) {
      this.router.navigate(['/login']);
      return;
    }
  }

  checksession () {
    this.http.get('http://localhost:3000/api/checksession', { withCredentials: true })
        .subscribe(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            if (resp.user !== undefined) {
              this.appstate.isLogin = true;
            } else {
              this.appstate.isLogin = false;
            }
          },
          error => {
            console.log(error);
          }
        );
  }
}

// ログイン済みなのにlogin及びregisterにアクセスした場合
@Injectable()
export class AuthguardService2 implements CanActivate {
  isLogin: boolean;
  constructor (private router: Router, private http: Http, private appstate: AppState) {
    this.isLogin = appstate.isLogin;
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.isLogin = this.appstate.isLogin;
    this.checksession();
   // テスト用に認証無効
    if (this.isLogin === true) {
      this.router.navigate(['/mypage']);
      return;
    }else if (this.isLogin === false) {
      return true;
    }
  }

  checksession () {
    this.http.get('http://localhost:3000/api/checksession', { withCredentials: true })
        .subscribe(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            if (resp.user !== undefined) {
              this.appstate.isLogin = true;
            } else {
              this.appstate.isLogin = false;
            }
          },
          error => {
            console.log(error);
          }
        );
  }
}
