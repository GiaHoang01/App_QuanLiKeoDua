import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent),
    data: {
      title: 'Khách hàng'
    }
  }
];


