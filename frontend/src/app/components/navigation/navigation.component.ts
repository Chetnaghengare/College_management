import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, RouterLink,  NgFor],
  template: `
    <div class="h-screen bg-gray-100 p-6">
      
      <!-- Main Content Area -->
      <h1 class="text-2xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
      <p class="text-gray-600 mt-2">Click on a menu item to navigate.</p>

      <!-- Menu Cards Section -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
        <div *ngFor="let item of menuItems" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
          <a [routerLink]="item.route" class="flex flex-col items-center text-gray-800">
            <span class="text-3xl">{{ item.icon }}</span>
            <span class="mt-2 font-semibold">{{ item.label }}</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class NavigationComponent {
  menuItems = [
    { label: 'Users', route: '/users', icon: '👤' },
    { label: 'Students', route: '/students', icon: '🎓' },
    { label: 'Instructors', route: '/instructors', icon: '👨‍🏫' },
    { label: 'Courses', route: '/courses', icon: '📚' },
    { label: 'Departments', route: '/departments', icon: '🏛️' },
    { label: 'Classrooms', route: '/classrooms', icon: '🏫' },
    { label: 'Advisors', route: '/advisors', icon: '📝' },
    { label: 'Prerequisites', route: '/prereqs', icon: '⚠️' },
    { label: 'Sections', route: '/sections', icon: '📖' },
    { label: 'Time Slots', route: '/time-slots', icon: '⏳' },
    { label: 'Teaches', route: '/teaches', icon: '📑' },
    { label: 'Takes', route: '/takes', icon: '🗂️' }
  ];
}
