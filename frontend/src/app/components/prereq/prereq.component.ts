import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-prereq',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-indigo-700">📚 Prerequisite Management</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Prerequisite Form -->
        <div class="p-6 bg-white shadow-md rounded-xl">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">➕ Add Prerequisite</h2>
          <form (ngSubmit)="submitForm()" class="space-y-4">
            <div>
              <label class="block font-semibold text-gray-700">📖 Course:</label>
              <select [(ngModel)]="prereq.course_id" name="course_id" required
                class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option *ngFor="let c of courses" [value]="c.course_id">
                  {{ c.course_id }} - {{ c.title }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-gray-700">🔗 Prerequisite Course:</label>
              <select [(ngModel)]="prereq.prereq_id" name="prereq_id" required
                class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option *ngFor="let c of courses" [value]="c.course_id">
                  {{ c.course_id }} - {{ c.title }}
                </option>
              </select>
            </div>
            <button type="submit"
              class="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition">
              ➕ Add Prerequisite
            </button>
          </form>
        </div>
        
        <!-- Prerequisite List -->
        <div class="p-6 bg-white shadow-md rounded-xl">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">📋 Prerequisite List</h2>
          <div class="border rounded-lg p-4 bg-indigo-50 max-h-[300px] overflow-y-auto">
            <div class="grid grid-cols-2 gap-4 font-bold bg-indigo-200 p-2 rounded">
              <div>📖 Course</div>
              <div>🔗 Prerequisite</div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div *ngFor="let p of prereqs" class="border-b p-2 text-gray-900">
                {{ getCourseTitle(p.course_id) }}
              </div>
              <div *ngFor="let p of prereqs" class="border-b p-2 text-gray-900">
                {{ getCourseTitle(p.prereq_id) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Button -->
      <div class="text-center mt-6">
        <button (click)="navigateToDashboard()"
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
          🏠 Go to Dashboard
        </button>
      </div>
      
    </div>
  `,
})

export class PrereqComponent {
  prereq = { course_id: '', prereq_id: '' };
  prereqs: any[] = [];
  courses: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getPrereqs();
    this.getCourses();
  }

  getPrereqs() {
    this.http.get<any[]>('http://localhost:5000/prereqs')
      .subscribe(data => this.prereqs = data);
  }

  getCourses() {
    this.http.get<any[]>('http://localhost:5000/courses')
      .subscribe(data => this.courses = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/prereqs', this.prereq)
      .subscribe(response => {
        console.log('Prerequisite added:', response);
        this.getPrereqs();
        this.prereq = { course_id: '', prereq_id: '' };
      });
  }

  getCourseTitle(courseId: string): string {
    const course = this.courses.find(c => c.course_id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  navigateToDashboard() {
    this.router.navigate(['/navigation']);
  }
}
