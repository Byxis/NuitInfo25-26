import { Component, signal } from '@angular/core';
import { Login } from '@auth/login/login.component';
import { RegisterPage } from "@auth/register-page/register-page";

@Component({
  selector: 'login-page',
  imports: [Login, RegisterPage],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPage {
  readonly usernames = ['admin', 'user1', 'guest'];

  readonly selectedUsername = signal<string | null>(null);

  readonly registerKey = '__register__';

  public selectUser(username: string) {
    this.selectedUsername.set(username);
  }
}
