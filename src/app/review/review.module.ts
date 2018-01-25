import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { TopComponent } from './top/top.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { PostComponent } from './post/post.component';
import { BrowserModule } from '@angular/platform-browser/src/browser';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
  ],
  declarations: [
    TopComponent,
    SearchComponent,
    DetailComponent,
    PostComponent
  ]
})
export class ReviewModule { }
