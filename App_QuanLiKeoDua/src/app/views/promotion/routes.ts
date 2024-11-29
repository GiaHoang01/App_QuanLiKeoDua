import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: 'promotion',
    loadComponent: () => import('./promotion/promotion.component').then(m => m.PromotionComponent),
    data: { title: 'Khuyến mãi', requiredPermission: 'Xem khuyến mãi' },
    canActivate: [PermissionGuard],
  }
];

