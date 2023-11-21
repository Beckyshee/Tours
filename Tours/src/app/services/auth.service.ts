// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  async registerUser(user: User): Promise<void> {
    try {
      // Assign a default role during registration
      user.role = 'user';

      let response = await fetch("http://localhost:1200/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  async loginUser(user: User): Promise<any> {
    try {
      let response = await fetch("http://localhost:1200/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }

      // const data = await response.json();

      // // Retrieve user role from the response and store it in the LS
      // const userRole = data.role;
      // localStorage.setItem('userRole', userRole);

      // console.log(data);

      return  response.json()
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}
