import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    { path: '', component: MypageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'review', component: TopComponent },
    { path: '**', component: ErrorComponent }

];

export const MY_ROUTES: ModuleWithProviders =
    RouterModule.forRoot(myRoutes);
