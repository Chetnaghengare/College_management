import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">🔐 Login</h2>
      <form (ngSubmit)="login()" class="space-y-4">
        <div>
          <label class="block font-semibold text-gray-700">👤 Username:</label>
          <input type="text" [(ngModel)]="user.username" name="username" required
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
        </div>
        <div>
          <label class="block font-semibold text-gray-700">🔑 Password:</label>
          <input type="password" [(ngModel)]="user.password" name="password" required
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
        </div>
        <div>
          <label class="block font-semibold text-gray-700">🎭 Role:</label>
          <select [(ngModel)]="user.role" name="role" required
            class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit"
          class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">
          🚀 Login
        </button>
      </form>
      <p *ngIf="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
    </div>
  `
})
export class UsersComponent {
    user = { username: '', password: '', role: '' };
    errorMessage = '';

    constructor(private http: HttpClient, private router: Router) { }

    login() {
        this.http.post<any>('http://localhost:5000/login', this.user).subscribe(
            response => {
                if (response.success) {
                    this.router.navigate(['/navigation']);
                } else {
                    this.errorMessage = 'Invalid credentials';
                }
            },
            error => {
                this.errorMessage = 'Error connecting to the server';
            }
        );
    }
}
