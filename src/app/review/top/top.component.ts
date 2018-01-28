import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {

  avatar = './assets/user1/user1_profile.jpg';
  items = [{ i: 1 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 5 },{ i: 2 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 4 },{ i: 3 },{ i: 4 },{ i: 3 },{ i: 2 },{ i: 1 },{ i: 4 },{ i: 2 },{ i: 4 },{ i: 5 },{ i: 3 },{ i: 2 },{ i: 3 }];

  // 星の数を表示するためのメソッド
  createstar = num => new Array(num);

}
