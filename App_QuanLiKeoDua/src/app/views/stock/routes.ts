import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./stock/stock.component').then(m => m.StockComponent),
    data: { title: 'Quản lý tồn kho', requiredPermission: 'Xem hàng hóa' },
    canActivate: [PermissionGuard],
  }
];


