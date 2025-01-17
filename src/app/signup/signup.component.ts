import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Firebase imports
import { Router } from '@angular/router'; // For navigation

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  requirements = {
    capital: false,
    digit: false,
    special: false,
    length: false,
    criteria: false,
  };
  successMessage: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

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

  async onSubmit(): Promise<void> {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill out all fields!');
      return;
    }

    if (!this.requirements.criteria) {
      alert('Your password does not meet all criteria!');
      return;
    }

    try {
      // Reference to the Firestore collection
      const usersCollection = collection(this.firestore, 'users');

      // Add the user's signup data to Firestore
      await addDoc(usersCollection, {
        username: this.username,
        email: this.email,
        password: this.password, // Avoid storing plain-text passwords in production
        timestamp: new Date(),
      });

      this.successMessage = 'You have successfully signed up!';
      console.log('User added to Firestore:', {
        username: this.username,
        email: this.email,
        password: this.password,
      });

      // Clear the form fields
      this.username = '';
      this.email = '';
      this.password = '';

      // Redirect after success
      setTimeout(() => {
        this.successMessage = '';
        this.router.navigate(['/']); // Adjust the route to your home page
      }, 1500);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  }
}
