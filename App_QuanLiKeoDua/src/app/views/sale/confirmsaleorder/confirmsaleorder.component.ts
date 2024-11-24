import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from "../../../components/paginator/paginator.component";
import { GlobalService } from '../../../../scss/services/global.service';
import { UtilsService } from '../../../../scss/services/untils.service';
import { APIService } from '../../../../scss/services/api.service';
import { API_ENDPOINT } from '../../../../environments/environments';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormatDateDirective } from '../../../directive/date-format.directive';
import { DatePickerComponent } from '../../../components/datepicker/datepicker.component';
import { AppQuickSearchComponent } from '../../../components/app-quick-search/app-quick-search.component';
import { SelectModule } from 'primeng/select';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { TransactionFilter } from '../../../interfaces/listfilter';

interface filters extends TransactionFilter
{
  customerId:any,
  cartId:any,
  employeeId:any,
  paymentMethodId:any,
}
interface DataResult {
  saleInvoiceOrders: any[],
  saleInvoiceOrder:any,
}

@Component({
  selector: 'app-confirmsaleorder',
  standalone: true,
  imports: [SelectModule,AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective],
  templateUrl: './confirmsaleorder.component.html',
  styleUrl: './confirmsaleorder.component.scss'
})
export class ConfirmsaleorderComponent {
  isExpanded: boolean = false;
  title: any;
  products!: any[];
  selectedProduct!: any;
  totalRows: number = 30;
  pageSize: number = 5;
  pageIndex: number = 1;
  IsShowPopupEdit: boolean = false;
  IsUpdate: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  filters!: filters;
  data: DataResult = {
    saleInvoiceOrders: [],
    saleInvoiceOrder:{}
  }
  constructor(private route: ActivatedRoute,protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -10),
      toDate: this.utilsService.getToDate(),
      searchString: "",
      customerId:"",
      paymentMethodId:"",
      cartId:"",
      employeeId:"",
    };
    this.getData()
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
    this.getData();
  }
  getData() {
    const body = {
      SearchString: this.filters.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
      FromDate:this.filters.fromDate,
      ToDate:this.filters.toDate,
      MaKhachHang:this.filters.customerId,
      MaNV:this.filters.employeeId,
      MaGioHang:this.filters.cartId,
      MaHinhThuc:this.filters.paymentMethodId
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "getAllSaleInvoiceWithWait", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.saleInvoiceOrders = response.data.saleInvoiceList;
          console.log(this.data.saleInvoiceOrders)
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
  showUpdate(row:any) {
    this.data.saleInvoiceOrder=deepCopy(row);
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.saleInvoiceOrder = {};
    this.IsUpdate=false;
    this.IsShowPopupEdit = true;
  }
}
