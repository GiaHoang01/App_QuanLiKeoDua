import { Routes } from '@angular/router';
import { PermissionGuard } from '../../../scss/services/guard.service';

export const routes: Routes = [
  {
    path: 'promotion',
    loadComponent: () => import('./promotion/promotion.component').then(m => m.PromotionComponent),
    data: { title: 'Khuyến mãi', requiredPermission: 'Xem khuyến mãi' },
    canActivate: [PermissionGuard],
  },
  {
    path: 'promotion/promotionDetail',  
    loadComponent: () =>
     import('./promotion/promotion-detail/promotion-detail.component').then((m) => m.PromotionDetailComponent),
      data: { title: 'Cập nhật chương trình khuyến mãi',requiredPermission: 'Xem tài khoản' },
      canActivate: [PermissionGuard],
  },
  {
    path: 'promotion/promotionAdd',  
    loadComponent: () =>
     import('./promotion/promotion-add/promotion-add.component').then((m) => m.PromotionAddComponent),
      data: { title: 'Thêm mới chương trình khuyến mãi',requiredPermission: 'Xem tài khoản' },
      canActivate: [PermissionGuard],
  } 
];

