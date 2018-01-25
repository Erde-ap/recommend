import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {

  avatar = './assets/user1/user1_profile.jpg';
  items = [{ i: 1 },{ i: 2 },{ i: 3 },{ i: 4 },{ i: 5 },{ i: 6 },{ i: 7 },{ i: 8 },{ i: 9 },{ i: 10 },{ i: 11 },{ i: 12 },{ i: 13 },{ i: 14 },{ i: 15 },{ i: 16 },{ i: 17 },{ i: 18 },{ i: 19 },{ i: 20 },{ i: 21 },{ i: 22 },{ i: 23 },{ i: 24 },{ i: 25 },{ i: 26 },{ i: 27 },{ i: 28 }];
}
