import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  async getUser() {
    try {
      if (this.loginForm.valid) {
        let user_details: User = this.loginForm.value;
        // console.log(user_details);

        await this.authService.loginUser(user_details).then((response) => {
          console.log(response.user);

          if (response.message) {
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
            alert(`you have logged in successfully ${response.message}`);

            if (response.user.role === 'admin') {
              localStorage.setItem('fullname', response.user.fullname!);
              localStorage.setItem('UserID', response.user.UserID);
              localStorage.setItem('role', response.user.role);
              this.router.navigate(['/admin']);
            } else if (response.user.role === 'user') {
              localStorage.setItem('role', response.user.role);
              localStorage.setItem('fullname', response.user.fullname!);
              localStorage.setItem('UserID', response.user.UserID);
              this.router.navigate(['/users']);
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
