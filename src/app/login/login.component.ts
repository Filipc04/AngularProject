import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
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

    this.successMessage = 'You are now signed up and logged in!';
    setTimeout(() => {
      this.successMessage = '';
      window.location.href = 'index.html'; // Avoid hardcoding URLs if possible
    }, 1500);

    console.log(
      `New member has a username of ${this.username} and password of ${this.password}`
    );

    this.username = '';
    this.password = '';
  }
}
