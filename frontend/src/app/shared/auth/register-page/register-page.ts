import { Component, input, output, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {

  private readonly _authService = inject(AuthService);
  // the special value used to compare selection (usually "__register__")
  key = input<string>('');

  // the globally selected value, same as Login uses
  selected = input<string | null>(null);

  // emit key() when this is clicked
  selectRegister = output<string>();

  // clears selection (sets selectedUsername to null)
  clear = output<void>();

  // is this tile selected?
  readonly isSelected = computed(() => this.selected() === this.key());

  readonly registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });



  submitRegistration(event?: Event) {
    event?.stopPropagation(); // prevents click from re-selecting

    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.getRawValue();
      this._authService.register(username, password);
    }
  }

  submitLogin(event?: Event) {
    event?.stopPropagation(); // prevents click from re-selecting

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this._authService.login(username, password);
    }
  }

  // fired when user clicks the tile (when unselected)
  select() {
    this.selectRegister.emit(this.key());
  }

  onCancel(event?: Event) {
    event?.stopPropagation();
    this.clear.emit();
  }
}
