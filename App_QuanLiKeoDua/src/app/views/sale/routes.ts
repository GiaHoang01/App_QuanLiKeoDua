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
  },
  {
    path: 'saleorder/saleOrderDetail',  
    loadComponent: () =>
      import('./saleorder/saleorder-detail/saleorder-detail.component').then((m) => m.SaleorderDetailComponent),
      data: { title: 'Cập nhật hóa đơn bán hàng', requiredPermission: 'Xem tài khoản'},
      canActivate: [PermissionGuard],
  },
  {
    path: 'saleorder/saleOrderAdd',  
    loadComponent: () =>
      import('./saleorder/saleorder-add/saleorder-add.component').then((m) => m.SaleorderAddComponent),
      data: { title: 'Thêm mới hóa đơn bán hàng',requiredPermission: 'Xem tài khoản' },
      canActivate: [PermissionGuard],
  }
];

