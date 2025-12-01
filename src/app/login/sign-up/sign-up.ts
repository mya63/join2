import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  constructor(private router: Router) {}

  signUpData = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptPrivacy: false,
  };

  signUpErrors: any = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    privacy: '',
  };

  private resetErrors(): void {
    for (const key in this.signUpErrors) {
      this.signUpErrors[key] = '';
    }
  }

  private validateEmpty(): void {
    if (!this.signUpData.name) this.signUpErrors.name = 'Please enter your name.';
    if (!this.signUpData.surname) this.signUpErrors.surname = 'Please enter your surname.';
    if (!this.signUpData.email) this.signUpErrors.email = 'Please enter your email.';
    if (!this.signUpData.password) this.signUpErrors.password = 'Please enter your password.';
    if (!this.signUpData.confirmPassword) {
      this.signUpErrors.confirmPassword = 'Please confirm your password.';
    }
  }

  private validatePasswordMatch(): void {
    if (
      this.signUpData.password &&
      this.signUpData.confirmPassword &&
      this.signUpData.password !== this.signUpData.confirmPassword
    ) {
      this.signUpErrors.confirmPassword = 'Your passwords do not match. Please try again.';
    }
  }

  private validatePrivacy(): void {
    if (!this.signUpData.acceptPrivacy) {
      this.signUpErrors.privacy = 'Please accept the Privacy Policy.';
    }
  }

  private hasErrors(): boolean {
    for (const key in this.signUpErrors) {
      if (this.signUpErrors[key]) {
        return true;
      }
    }
    return false;
  }

  onSubmit(): void {
    this.resetErrors();
    this.validateEmpty();
    this.validatePasswordMatch();
    this.validatePrivacy();

    if (this.hasErrors()) {
      return;
    }

    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
