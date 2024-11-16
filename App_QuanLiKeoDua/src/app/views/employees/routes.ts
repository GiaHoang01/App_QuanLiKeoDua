import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent),
    data: {
      title: 'Nhân viên'
    }
  }
];


