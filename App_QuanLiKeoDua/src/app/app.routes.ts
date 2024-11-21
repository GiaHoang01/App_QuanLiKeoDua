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
        data: {
          title: 'Tài khoản'
        },
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
        data: {
          title: 'Nhân viên'
        },
        loadChildren: () => import('./views/employees/routes').then((m) => m.routes)
      },
      {
        path: '',
        data: {
          title: 'Phiếu nhập hàng'
        },
        loadChildren: () => import('./views/purchase/routes').then((m) => m.routes)
      },
      {
        path: 'product',
        data: {
          title: 'Hàng hóa'
        },
        loadChildren: () => import('./views/products/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', redirectTo: 'login' } 
];