import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePickerComponent } from "../../../components/datepicker/datepicker.component";
import { DropdownComponent } from "../../../components/dropdown/dropdown.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from "../../../components/paginator/paginator.component";
import { GlobalService } from '../../../../scss/services/global.service';
import { UtilsService } from '../../../../scss/services/untils.service';
import { TransactionFilter } from '../../../interfaces/listfilter';
import { APIService } from '../../../../scss/services/api.service';

interface filters extends TransactionFilter
{

}
@Component({
  selector: 'app-saleorder',
  standalone: true,
  imports: [ DropdownComponent, TableModule, CommonModule, PaginatorComponent, DatePickerComponent],
  templateUrl: './saleorder.component.html',
  styleUrl: './saleorder.component.scss'
})


export class SaleorderComponent implements OnInit{

  isExpanded: boolean = false;
  title: any;
  products!: any[];
  selectedProduct!: any;
  totalRows: number = 30;
  pageSize: number = 5;
  pageIndex: number = 1;

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  filters!: filters;

  constructor(private route: ActivatedRoute,protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService,) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -1),
      toDate: this.utilsService.getToDate(),
      searchString: ""
    };
    this.products = [
      { id: '1000', code: 'MH01', name: 'Bamboo Watch 1', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
      { id: '1001', code: 'MH02', name: 'Bamboo Watch 2', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 23, inventoryStatus: 'INSTOCK', rating: 5 },
    ];
  }

  // Toggle để phóng to/thu nhỏ phần bộ lọc
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  onPageChange(event: any) {
    // this.getData();
    this.globalService.paging.TotalRows=30;
  }

  onRowsChange(event: any) {
    this.onSearch();
  }

  onSearch(): void {
    this.globalService.paging.PageIndex = 1;
    // this.getData();
    this.globalService.paging.TotalRows=30;
  }
}
