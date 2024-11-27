import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
 
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {title: 'Danh sách phiếu nhập' ,requiredPermission: 'Xem tài khoản'},
    canActivate: [PermissionGuard],
  }
];
