import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    data: { title: 'Hàng hóa', requiredPermission: 'Xem hàng hóa' },
    canActivate: [PermissionGuard],
  }
];


