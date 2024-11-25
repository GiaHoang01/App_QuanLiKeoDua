import { Routes } from '@angular/router';

// Routes chính
export const routes: Routes = [
  {
    path: 'purchaseOrderRequest',
    loadComponent: () =>
      import('./purchase-order-request/purchase-order-request.component').then((m) => m.PurchaseOrderComponent),
      data: { title: 'Yêu cầu nhập hàng' }
  },
  {
    path: 'purchaseOrderRequest/purchaseOrderRequestAdd',
    loadComponent: () =>
      import('./purchase-order-request/purchase-order-request-add/purchase-order-request-add.component').then((m) => m.PurchaseOrderAddComponent),
      data: { title: 'Cập nhật phiếu yêu cầu nhập hàng' }
  },
  {
    path: 'purchaseOrder',  
    loadComponent: () =>
      import('./purchase-order/purchase-order.component').then((m) => m.PurchaseOrderComponent),
      data: { title: 'Phiếu nhập hàng' }
  },
  {
    path: 'purchaseOrder/purchaseOrderDetail',  
    loadComponent: () =>
      import('./purchase-order/purchase-order-detail/purchase-order-detail.component').then((m) => m.PurchaseOrderDetailComponent),
      data: { title: 'Phiếu nhập hàng' }
  },
  {
    path: 'confirmPurchaseOrder',
    loadComponent: () => import('./confirm-purchase-order/confirm-purchase-order.component').then(m => m.ConfirmPurchaseOrderComponent),
    data: {title: 'Danh sách phiếu nhập' }
  },
  {
    path: 'confirmPurchaseOrder/confirmPurchaseOrderDetail',
    loadComponent: () => import('./confirm-purchase-order/confirm-purchase-order-detail/confirm-purchase-order-detail.component').then(m => m.ConfirmPurchaseOrderDetailComponent),
    data: {title: 'Xác nhận phiếu nhập' }
  },
];
