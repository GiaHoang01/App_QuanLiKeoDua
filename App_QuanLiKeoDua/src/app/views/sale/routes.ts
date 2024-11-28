import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
  {
    path: 'saleorder',
    loadComponent: () => import('./saleorder/saleorder.component').then(m => m.SaleorderComponent),
    data: {title: 'Đơn đặt hàng' ,requiredPermission: 'Xem tài khoản'},
    canActivate: [PermissionGuard],
  },
  {
    path: 'confirmsaleorder',
    loadComponent: () => import('./confirmsaleorder/confirmsaleorder.component').then(m => m.ConfirmsaleorderComponent),
    data: {title: 'Duyệt đơn hàng' ,requiredPermission: 'Xem tài khoản'},
    canActivate: [PermissionGuard],
  }
];

