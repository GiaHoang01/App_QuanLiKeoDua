import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'saleorder',
    loadComponent: () => import('./saleorder/saleorder.component').then(m => m.SaleorderComponent),
    data: {title: 'Đơn đặt hàng' }
  },
  {
    path: 'confirmsaleorder',
    loadComponent: () => import('./confirmsaleorder/confirmsaleorder.component').then(m => m.ConfirmsaleorderComponent),
    data: {title: 'Duyệt đơn hàng' }
  }
];

