import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';
export const routes: Routes = [
  {
    path: 'shippingnote',
    loadComponent: () => import('./shipping-note/shipping-note.component').then(m => m.ShippingNoteComponent),
    data: {title: 'Phiếu giao hàng' ,requiredPermission: 'VIEW_SALE_ORDER'},
    canActivate: [PermissionGuard],
  },
];

