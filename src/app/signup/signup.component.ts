import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Firebase imports
import { Router } from '@angular/router'; // For navigation
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8), // Minimum 8 characters
        Validators.pattern(/(?=.*[A-Z].*[A-Z])/), // At least 2 uppercase letters
        Validators.pattern(/(?=.*\d)/), // At least 1 digit
        Validators.pattern(/(?=.*[@$!%*?&])/) // At least 1 special character
      ],
    ],
  });
  
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next: () => {
      this.router.navigateByUrl('/');
  },
error: (err) => {
  this.errorMessage = err.code;
}
})
  }
}