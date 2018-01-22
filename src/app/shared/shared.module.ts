import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTabsModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTabsModule,
    MatInputModule
  ]
})
export class SharedModule { }
