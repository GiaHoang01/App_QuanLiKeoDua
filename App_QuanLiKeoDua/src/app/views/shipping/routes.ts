import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'shippingnote',
    loadComponent: () => import('./shipping-note/shipping-note.component').then(m => m.ShippingNoteComponent),
    data: {title: 'Phiếu giao hàng' }
  },
];

