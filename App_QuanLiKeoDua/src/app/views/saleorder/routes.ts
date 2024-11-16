import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./saleorder/saleorder.component').then(m => m.SaleorderComponent),
    data: {
      title: 'Đơn đặt hàng'
    }
  }
];

