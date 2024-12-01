import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: 'save',
    loadComponent: () => import('./save/save.component').then(m => m.SaveComponent),
    data: {title: 'Sao lưu và phục hồi' ,requiredPermission: 'Xem tài khoản'},
    canActivate: [PermissionGuard],
  }
];


