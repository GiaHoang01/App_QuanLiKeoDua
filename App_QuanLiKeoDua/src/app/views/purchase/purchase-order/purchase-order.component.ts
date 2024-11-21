import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePickerComponent } from "../../../components/datepicker/datepicker.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from "../../../components/paginator/paginator.component";
import { GlobalService } from '../../../../scss/services/global.service';
import { UtilsService } from '../../../../scss/services/untils.service';
import { TransactionFilter } from '../../../interfaces/listfilter';
import { APIService } from '../../../../scss/services/api.service';
import { API_ENDPOINT } from '../../../../environments/environments';
import { FormsModule } from '@angular/forms';
import { FormatDateDirective } from '../../../directive/date-format.directive';
import { ButtonModule } from 'primeng/button';
interface filters extends TransactionFilter
{

}

interface DataResult {
  purchaseOrders: any[],
}
@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [RouterModule,ButtonModule,TableModule, CommonModule, PaginatorComponent, DatePickerComponent,FormsModule,FormatDateDirective],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.scss'
})
export class PurchaseOrderComponent  implements OnInit{
  isExpanded: boolean = false;
  title: any;
  selectedProduct!: any;
  totalRows: number = 0;
  pageSize: number = 1;
  pageIndex: number = 1;
  isLoading: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  data: DataResult = {
    purchaseOrders: []
  }
  filters!: filters;
  searchString:string="";

  constructor(private route: ActivatedRoute,private router:Router,protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -1),
      toDate: this.utilsService.getToDate(),
      searchString: ""
    };
   
  }

  link()
  {
    this.router.navigate(['/purchaseorder/purchaseOrderAdd'], {
      queryParams: { id: 'null'}
    }).then(() => {
      console.log('Navigated to /purchaseorder/purchaseOrderAdd');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  
  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
      FromDate:this.filters.fromDate,
      ToDate:this.filters.toDate
    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "getAllPurchaseOrder", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.purchaseOrders = response.data.purchaseOrders;
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
  // Toggle để phóng to/thu nhỏ phần bộ lọc
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  onPageChange(event: any) {
    this.getData();
  }

  onRowsChange(event: any) {
    this.onSearch();
  }

  onSearch(): void {
    this.globalService.paging.PageIndex = 1;
    this.getData();
  }
}
