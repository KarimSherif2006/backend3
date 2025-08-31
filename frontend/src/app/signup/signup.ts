import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  signup(): void {
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to signup. Please try again.';
        console.error('Signup failed', error);
      }
    });
  }
}
