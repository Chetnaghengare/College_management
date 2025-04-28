import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

interface Department {
  dept_name: string;
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8 flex flex-col items-center">

    <!-- Heading -->
    <h1 class="text-4xl font-bold text-gray-800 mb-6">📚 Course Management</h1>
    
    <div class="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
      
      <!-- Course Form -->
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">➕ Add New Course</h2>
        <form (ngSubmit)="submitForm()" class="space-y-4">
          <div>
            <label class="block font-medium text-gray-600">Course ID</label>
            <input type="text" [(ngModel)]="course.course_id" name="course_id" required
              class="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
          <div>
            <label class="block font-medium text-gray-600">Title</label>
            <input type="text" [(ngModel)]="course.title" name="title"
              class="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
          <div>
            <label class="block font-medium text-gray-600">Department</label>
            <select [(ngModel)]="course.dept_name" name="dept_name" required
              class="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none">
              <option *ngFor="let dept of departments" [value]="dept.dept_name">{{ dept.dept_name }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium text-gray-600">Credits</label>
            <input type="number" [(ngModel)]="course.credits" name="credits"
              class="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
          <button type="submit"
            class="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition">Add Course</button>
        </form>
      </div>

      <!-- Course List -->
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">📋 Course List</h2>
        <div class="space-y-4 max-h-[400px] overflow-y-auto">
          <div *ngFor="let c of courses" class="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow">
            <div class="font-semibold text-gray-900">📖 {{ c.course_id }} - <span class="text-blue-700">{{ c.title }}</span></div>
            <div class="text-gray-700">🏛️ <span class="font-medium">{{ c.dept_name }}</span></div>
            <div class="text-gray-600">🎓 <span class="font-medium">{{ c.credits }} Credits</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Button -->
    <button (click)="navigateToHome()" 
      class="mt-6 bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-md">
      🔄 Go to Navigation
    </button>
  </div>
  `,
})

export class CourseComponent {
  course = { course_id: '', title: '', dept_name: '', credits: null };
  courses: any[] = [];
  departments: Department[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getCourses();
    this.getDepartments();
  }

  getCourses() {
    this.http.get<any[]>('http://localhost:5000/courses')
      .subscribe(data => this.courses = data);
  }

  getDepartments() {
    this.http.get<Department[]>('http://localhost:5000/departments')
      .subscribe(data => this.departments = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/courses', this.course)
      .subscribe(response => {
        console.log('Course added:', response);
        this.getCourses();
        this.course = { course_id: '', title: '', dept_name: '', credits: null };
      });
  }

  navigateToHome() {
    this.router.navigate(['/navigation']);
  }
}
