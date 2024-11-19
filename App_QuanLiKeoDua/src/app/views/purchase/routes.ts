import { Routes } from '@angular/router';

// Routes chính
export const routes: Routes = [
  {
    path: 'purchaseorder',
    loadComponent: () =>
      import('./purchase-order/purchase-order.component').then((m) => m.PurchaseOrderComponent),
  },
  {
    path: 'purchaseorder/purchaseOrderAdd',
    loadComponent: () =>
      import('./purchase-order/purchase-order-add/purchase-order-add.component').then((m) => m.PurchaseOrderAddComponent),
      data: { title: 'Cập nhật phiếu mua hàng' }
  }
];
