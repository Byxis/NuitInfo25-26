import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Login } from '@auth/login/login.component';
import { RegisterPage } from '@auth/register-page/register-page';

@Component({
  selector: 'login-page',
  imports: [Login, RegisterPage],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPage implements OnInit, OnDestroy {
  readonly usernames = ['admin', 'user1', 'guest'];

  readonly selectedUsername = signal<string | null>(null);

  readonly registerKey = '__register__';

  currentTime: string = '';
  currentDate: string = '';
  private timeInterval?: number;

  ngOnInit() {
    this.updateTime();
    this.timeInterval = window.setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime() {
    const now = new Date();

    // Format time as HH:MM
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;

    // Format date as "Day, Month Date"
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    this.currentDate = now.toLocaleDateString('fr-FR', options);
  }

  public selectUser(username: string) {
    this.selectedUsername.set(username);
  }
}
