import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent),
    data: {title: 'Nhân viên' ,requiredPermission: 'Xem nhân viên'},
    canActivate: [PermissionGuard],
  }
];


