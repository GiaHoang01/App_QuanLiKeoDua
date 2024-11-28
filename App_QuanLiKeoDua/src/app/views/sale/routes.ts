import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'saleOrder',
    loadComponent: () => import('./saleorder/saleorder.component').then(m => m.SaleorderComponent),
    data: {title: 'Đơn đặt hàng' }
  },
  {
    path: 'confirmsaleorder',
    loadComponent: () => import('./confirmsaleorder/confirmsaleorder.component').then(m => m.ConfirmsaleorderComponent),
    data: {title: 'Duyệt đơn hàng' }
  },
  {
    path: 'saleOrder/saleOrderDetail',  
    loadComponent: () =>
      import('./saleorder/saleorder-detail/saleorder-detail.component').then((m) => m.SaleorderDetailComponent),
      data: { title: 'Cập nhật hóa đơn bán hàng' }
  },
  {
    path: 'saleOrder/saleOrderAdd',  
    loadComponent: () =>
      import('./saleorder/saleorder-add/saleorder-add.component').then((m) => m.SaleorderAddComponent),
      data: { title: 'Cập nhật hóa đơn bán hàng' }
  },
];

