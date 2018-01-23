import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopComponent } from './top/top.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    TopComponent,
    SearchComponent,
    DetailComponent,
    PostComponent
  ],
  exports: [
    CommonModule
  ],
  declarations: [
    TopComponent,
    SearchComponent,
    DetailComponent,
    PostComponent
  ]
})
export class ReviewModule { }
