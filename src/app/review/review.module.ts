import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopComponent } from './top/top.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { PostComponent } from './post/post.component';

@NgModule({
<<<<<<< HEAD
  imports: [
    CommonModule,
    TopComponent,
    SearchComponent,
    DetailComponent,
    PostComponent
  ],
=======
>>>>>>> 6788789da85c120eb5d5b28428247748443785fa
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
