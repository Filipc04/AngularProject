import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(Auth);

  errorMessage: string | null = null;

  // Reactive form setup
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z].*[A-Z])/), // At least 2 uppercase letters
        Validators.pattern(/(?=.*\d)/), // At least 1 digit
        Validators.pattern(/(?=.*[@$!%*?&])/), // At least 1 special character
      ],
    ],
  });

  // Password validation helpers
  get isLengthValid(): boolean {
    const password = this.form.get('password')?.value || '';
    return password.length >= 8;
  }

  get hasTwoUppercase(): boolean {
    const password = this.form.get('password')?.value || '';
    return /(?=.*[A-Z].*[A-Z])/.test(password);
  }

  get hasOneDigit(): boolean {
    const password = this.form.get('password')?.value || '';
    return /(?=.*\d)/.test(password);
  }

  get hasOneSpecialChar(): boolean {
    const password = this.form.get('password')?.value || '';
    return /(?=.*[@$!%*?&])/.test(password);
  }

  validatePassword(): void {
    // Triggers dynamic UI updates for password validation feedback
    this.form.get('password')?.updateValueAndValidity({ emitEvent: true });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const { username, email, password } = this.form.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
      await updateProfile(userCredential.user, { displayName: username });
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
