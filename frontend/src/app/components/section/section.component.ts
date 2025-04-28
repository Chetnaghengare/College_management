import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-3xl font-bold text-gray-800">Manage Sections</h1>
        <button (click)="navigateToDashboard()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          🏠 Go to Dashboard
        </button>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Section Form -->
        <div class="p-6 bg-white shadow-md rounded-xl">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">🏫 Section Form</h2>
          <form (ngSubmit)="submitForm()" class="space-y-4">
            
            <div>
              <label class="block font-semibold text-gray-700">📖 Course:</label>
              <select [(ngModel)]="section.course_id" name="course_id" required
                class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option *ngFor="let c of courses" [value]="c.course_id">
                  {{ c.course_id }} - {{ c.title }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-gray-700">🔢 Section ID:</label>
                <input type="text" [(ngModel)]="section.sec_id" name="sec_id" required
                  class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block font-semibold text-gray-700">📆 Semester:</label>
                <input type="text" [(ngModel)]="section.semester" name="semester" required
                  class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
            </div>
            
            <div>
              <label class="block font-semibold text-gray-700">📅 Year:</label>
              <input type="number" [(ngModel)]="section.year" name="year" required
                class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>

            <button type="submit"
              class="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition">
              ➕ Add Section
            </button>
          </form>
        </div>

        <!-- Section List -->
        <div class="p-6 bg-white shadow-md rounded-xl">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">📋 Section List</h2>
          <div class="border rounded-lg p-4 bg-indigo-50 max-h-[300px] overflow-y-auto">
            <div class="grid grid-cols-3 gap-4 font-bold bg-indigo-200 p-2 rounded">
              <div>📖 Course</div>
              <div>🔢 Section</div>
              <div>📆 Semester</div>
            </div>
            <div *ngFor="let s of sections" class="grid grid-cols-3 gap-4 border-b p-2 text-gray-900">
              <div>{{ s.course_id }}</div>
              <div>{{ s.sec_id }}</div>
              <div>{{ s.semester }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SectionComponent {
  section = { course_id: '', sec_id: '', semester: '', year: null, building: '', room_number: '', time_slot_id: '' };
  sections: any[] = [];
  courses: any[] = [];
  classrooms: any[] = [];
  timeSlots: any[] = [];
  selectedClassroom: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getSections();
    this.getCourses();
  }

  getSections() {
    this.http.get<any[]>('http://localhost:5000/sections')
      .subscribe(data => this.sections = data);
  }

  getCourses() {
    this.http.get<any[]>('http://localhost:5000/courses')
      .subscribe(data => this.courses = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/sections', this.section)
      .subscribe(response => {
        console.log('Section added:', response);
        this.getSections();
        this.section = { course_id: '', sec_id: '', semester: '', year: null, building: '', room_number: '', time_slot_id: '' };
      });
  }

  navigateToDashboard() {
    this.router.navigate(['/navigation']);
  }
}
