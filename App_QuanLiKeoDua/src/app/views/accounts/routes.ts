import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./accounts/accounts.component').then(m => m.AccountsComponent),
    data: {title: 'Tài khoản' ,requiredPermission: 'Xem tài khoản'},
    canActivate: [PermissionGuard],
  }
];


