import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./accounts/accounts.component').then(m => m.AccountsComponent),
    data: {
      title: 'Tài khoản'
    }
  }
];


