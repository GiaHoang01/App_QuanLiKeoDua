import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    data: {
      title: 'Hàng hóa'
    }
  }
];


