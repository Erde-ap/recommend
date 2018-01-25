import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthguardService, AuthguardService2 } from './shared/authguard/authguard.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MypageComponent } from './mypage/mypage.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailComponent } from './review/detail/detail.component';
import { ErrorComponent } from './shared/error/error.component';
import { TopComponent } from './review/top/top.component';

const myRoutes = [
  { path: 'test', component: TopComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthguardService2] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthguardService2] },
  { path: 'homepage', component: HomepageComponent },
  {path: '', canActivate: [AuthguardService], children: [
    { path: 'mypage', component: MypageComponent },
    { path: 'review', component: TopComponent },
    { path: '**', component: ErrorComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  providers: [AuthguardService, AuthguardService2],
  exports: [RouterModule]
})
export class AppRoutingModule {}
