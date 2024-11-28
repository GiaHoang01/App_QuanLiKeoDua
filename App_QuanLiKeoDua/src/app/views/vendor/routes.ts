import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vendor/vendor.component').then(m => m.VendorComponent),
    data: { title: 'Nhà cung cấp', requiredPermission: 'Xem nhà cung cấp' },
    canActivate: [PermissionGuard],
  }
];


