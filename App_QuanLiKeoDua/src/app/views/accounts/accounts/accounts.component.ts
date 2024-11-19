import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PickListComponent } from "../../../components/pick-list/pick-list.component";
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, TabsModule, PickListComponent,TableModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  title: string | undefined;
  products!: any[];
  selectedProduct!: any;
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.products=[{
      id: '1000',
      code: 'MH01',
      name: 'Bamboo Watch Giaaaaaaaaaaaaaaaaaaaaaa',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1000',
      code: 'MH02',
      name: 'Bamboo Watch Giaaaaaaaaaaaaaaaaaaaaaaanhhhhhh',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories adsdasdsaádasdasdasd',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'MH02',
      name: 'Bamboo Watch Giaaaaaaaaaaaaaaaaaaaaaaanhhhhhh',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories adsdasdsaádasdasdasd',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }]
  }
}
