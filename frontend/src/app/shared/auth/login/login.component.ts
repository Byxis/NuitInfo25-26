import { Component, effect, inject, input, computed, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'login',
  imports: [
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class Login {
  private readonly svc = inject(AuthService);
  private readonly router = inject(Router);

  readonly username = input<string>('');
  readonly selected = input<string | null>(null);

  readonly select = output<string>();
  readonly clear = output<null>();

  readonly isSelected = computed(() => {
    return this.selected() === this.username();
  });

  readonly isLoading = this.svc.isLoading;
  readonly error = this.svc.error;

  onCancel(event: Event) {
    event.stopPropagation(); // prevent selecting again
    this.clear.emit(null);
  }

  constructor() {
    effect(() => {
      if (this.svc.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    });
  }

  readonly form = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required],
    }),
  });

  selectThisUser() {
    this.select.emit(this.username());
  }

  submit() {
    if (this.form.valid) {
      var login: string = this.username();
      var password: string = this.form.value.password ?? '';
      if (login && password) {
        this.svc.login(login, password);
      }
    }
  }
}
