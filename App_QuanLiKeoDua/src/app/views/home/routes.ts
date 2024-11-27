import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: { title: 'Trang chủ', requiredPermission: 'Xem nhân viên' },
    canActivate: [PermissionGuard],
  }
];


