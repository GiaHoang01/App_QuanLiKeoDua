import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { PermissionGuard } from '../scss/services/guard.service';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem tài khoản' ,title:'Trang chủ'},
        canActivate: [PermissionGuard],
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem tài khoản' },
        canActivate: [PermissionGuard],
      },
      {
        path: 'accounts',
        loadChildren: () => import('./views/accounts/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem tài khoản' },
        canActivate: [PermissionGuard],
      },
      {
        path: 'saleorder',
        data: { requiredPermission: 'Xem phiếu nhập hàng' },
        canActivate: [PermissionGuard],
        loadChildren: () => import('./views/sale/routes').then((m) => m.routes)
      },
      {
        path: 'employee',
        loadChildren: () => import('./views/employees/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem phiếu nhập hàng' },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        loadChildren: () => import('./views/purchase/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem phiếu nhập hàng' },
        canActivate: [PermissionGuard],
      },
      {
        path: 'product',
        loadChildren: () => import('./views/products/routes').then((m) => m.routes),
        data: { requiredPermission: 'VIEW_SALE_ORDER' },
        canActivate: [PermissionGuard],
      },
      {
        path: 'customer',
        loadChildren: () => import('./views/customers/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem phiếu nhập hàng' },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        loadChildren: () => import('./views/sale/routes').then((m) => m.routes),
        data: { requiredPermission: 'VIEW_SALE_ORDER' },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        loadChildren: () => import('./views/shipping/routes').then((m) => m.routes),
        data: { requiredPermission: 'VIEW_SALE_ORDER' },
        canActivate: [PermissionGuard],
      }, 
      {
        path: 'home', 
        loadChildren: () => import('./views/home/routes').then((m) => m.routes),
        data: { requiredPermission: 'Xem phiếu nhập hàng' },
        canActivate: [PermissionGuard],
      },
    ]
  },
  {
    path: 'login',
    title:'Trang chủ',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
  },
  { path: '**', redirectTo: 'login' }
];