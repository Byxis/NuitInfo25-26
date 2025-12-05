import { Routes } from '@angular/router';
import { LoginPage } from '@auth/login-page/login-page.component';
import { HomePage } from './pages/home/home.component';
import { AdminComponent } from '@admin/admin/admin.component';
import { authGuard } from '@auth/auth.guard';
import { adminGuard } from '@admin/admin.guard';
import { Quizz } from './pages/quizz/quizz';
import { QuizComponent } from './pages/quiz-component/quiz-component';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: '**', redirectTo: '' },
];
