import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';;
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MY_ROUTES } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RecommendComponent } from "./recommend/recommend.component";
import { MypageComponent } from './mypage/mypage.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    RecommendComponent,
    MypageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    MY_ROUTES
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }