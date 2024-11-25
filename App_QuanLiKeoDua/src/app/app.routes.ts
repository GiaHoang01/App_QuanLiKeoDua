import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./views/accounts/routes').then((m) => m.routes)
      },
      {
        path: 'saleorder',
        data: {
          title: 'Đơn đặt hàng'
        },
        loadChildren: () => import('./views/sale/routes').then((m) => m.routes)
      },
      {
        path: 'employee',
        loadChildren: () => import('./views/employees/routes').then((m) => m.routes)
      },
      {
        path: '',
        loadChildren: () => import('./views/purchase/routes').then((m) => m.routes)
      },
      {
        path: 'product',
        loadChildren: () => import('./views/products/routes').then((m) => m.routes)
      },
      {
        path: 'customer',
        loadChildren: () => import('./views/customers/routes').then((m) => m.routes)
      },
      {
        path: '',
        loadChildren: () => import('./views/sale/routes').then((m) => m.routes)
      },
      {
        path: '',
        loadChildren: () => import('./views/shipping/routes').then((m) => m.routes)
      }, 
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
  },
  { path: '**', redirectTo: 'login' }
];