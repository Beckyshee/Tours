import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  constructor(private fb:FormBuilder, private authService: AuthService){
    this.loginForm = this.fb.group({
      
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      
    });
  
    
  }
  async getUser(){
  
  let user_details: User = this.loginForm.value;
 const response= await this.authService.registerUser(user_details)
    
  }
}
