import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  // Import Router for navigation
import { AuthService } from '../auth.service';  // Ensure this path is correct

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, RouterModule],  // Required imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  requirements = {
    capital: false,
    digit: false,
    special: false,
    length: false,
    criteria: false,
  };
  successMessage: string = '';

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}  // Use @Inject and inject Router

  validatePassword(): void {
    const capital = /[A-Z]/g;
    const digit = /\d/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    const length = /.{8,}/;

    this.requirements.capital = (this.password.match(capital) || []).length >= 2;
    this.requirements.digit = digit.test(this.password);
    this.requirements.special = special.test(this.password);
    this.requirements.length = length.test(this.password);
    this.requirements.criteria =
      this.requirements.capital &&
      this.requirements.digit &&
      this.requirements.special &&
      this.requirements.length;
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      alert('Ensure you input a value in both fields!');
      return;
    }

    if (!this.requirements.criteria) {
      alert('Your password does not meet all criteria!');
      return;
    }

    this.authService.login();  // Call login method from AuthService
    this.successMessage = 'You are now logged in!';

    setTimeout(() => {
      this.successMessage = '';
      // Redirect to homepage after login
      this.router.navigate(['/']);  // Redirect to homepage
    }, 1500);

    console.log(`Logged in with username: ${this.username}`);
    this.username = '';
    this.password = '';
  }
}
