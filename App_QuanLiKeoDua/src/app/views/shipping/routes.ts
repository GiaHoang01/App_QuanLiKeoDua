import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
  {
    path: 'shippingnote',
    loadComponent: () => import('./shipping-note/shipping-note.component').then(m => m.ShippingNoteComponent),
    data: {title: 'Phiếu giao hàng' ,requiredPermission: 'VIEW_SALE_ORDER'},
    canActivate: [PermissionGuard],
  },
  {
    path: 'shippingnote/shippingNoteAdd',
    loadComponent: () => import('./shipping-note/shipping-note-add/shipping-note-add.component').then(m => m.ShippingNoteAddComponent),
    data: {title: 'Thông tin phiếu giao hàng' }
  },
  {
    path: 'shippingnoteconfirm',
    loadComponent: () => import('./shipping-note-confirm/shipping-note-confirm.component').then(m => m.ShippingNoteConfirmComponent),
    data: {title: 'Nhận phiếu giao hàng' }
  },
];

