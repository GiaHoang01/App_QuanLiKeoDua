import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
  {
    path: 'shippingnote',
    loadComponent: () =>
      import('./shipping-note/shipping-note.component').then(
        (m) => m.ShippingNoteComponent
      ),
    data: { title: 'Phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnote/shippingNoteAdd',
    loadComponent: () =>
      import('./shipping-note/shipping-note-add/shipping-note-add.component').then(
        (m) => m.ShippingNoteAddComponent
      ),
    data: { title: 'Thông tin phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnoteconfirm',
    loadComponent: () =>
      import('./shipping-note-confirm/shipping-note-confirm.component').then(
        (m) => m.ShippingNoteConfirmComponent
      ),
    data: { title: 'Nhận phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnoteconfirm/shippingnoteConfirmAdd',
    loadComponent: () =>
      import(
        './shipping-note-confirm/shipping-note-confirm-add/shipping-note-confirm-add.component'
      ).then((m) => m.ShippingNoteConfirmAddComponent),
    data: { title: 'Nhận phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnotecancel',
    loadComponent: () =>
      import('./shipping-note-cancel/shipping-note-cancel.component').then(
        (m) => m.ShippingNoteCancelComponent
      ),
    data: { title: 'Hủy phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnotecancel/shippingnotecancelAdd',
    loadComponent: () =>
      import('./shipping-note-cancel/shipping-note-cancel-add/shipping-note-cancel-add.component').then(
        (m) => m.ShippingNoteCancelAddComponent
      ),
    data: { title: 'Hủy phiếu giao hàng', requiredPermission: 'Xem tài khoản' },
    canActivate: [PermissionGuard],
  },
];

