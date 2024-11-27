import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./saleorder/saleorder.component').then(m => m.SaleorderComponent),
    data: {title: 'Đơn đặt hàng' ,requiredPermission: 'VIEW_SALE_ORDER'},
    canActivate: [PermissionGuard],
  },
  {
    path: 'confirmsaleorder',
    loadComponent: () => import('./confirmsaleorder/confirmsaleorder.component').then(m => m.ConfirmsaleorderComponent),
    data: {title: 'Duyệt đơn hàng' ,requiredPermission: 'VIEW_SALE_ORDER1'},
    canActivate: [PermissionGuard],
  }
];

