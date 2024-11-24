import { Routes } from '@angular/router';

// Routes chính
export const routes: Routes = [
  {
    path: 'purchaseorder',
    loadComponent: () =>
      import('./purchase-order-request/purchase-order-request.component').then((m) => m.PurchaseOrderComponent),
  },
  {
    path: 'purchaseorder/purchaseOrderRequestAdd',
    loadComponent: () =>
      import('./purchase-order-request/purchase-order-request-add/purchase-order-request-add.component').then((m) => m.PurchaseOrderAddComponent),
      data: { title: 'Cập nhật phiếu mua hàng' }
  }
];
