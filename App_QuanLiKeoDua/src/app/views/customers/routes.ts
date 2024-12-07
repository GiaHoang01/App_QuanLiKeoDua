import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent),
    data: {title: 'Khách hàng' ,requiredPermission: 'Xem khách hàng'},
    canActivate: [PermissionGuard],
  }
];


