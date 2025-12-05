import { Routes } from '@angular/router';
import { LoginPage } from '@auth/login-page/login-page.component';
import { HomePage } from './pages/home/home.component';
import { authGuard } from '@auth/auth.guard';
import { Windows } from './pages/windows/windows';

export const routes: Routes = [
  { path: '', component: Windows, canActivate: [authGuard]},
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '' }
];
