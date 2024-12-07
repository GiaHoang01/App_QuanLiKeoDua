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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

interface filters extends TransactionFilter {
  customerId: any,
  cartId: any,
  employeeId: any,
  paymentMethodId: any,
}
interface DataResult {
  saleInvoiceOrders: any[],
}
@Component({
  selector: 'app-saleorder',
  standalone: true,
  providers: [MessageService],
  imports: [RouterModule, ToastModule, ButtonModule, TableModule, CommonModule, PaginatorComponent, DialogModule, DatePickerComponent, FormsModule, FormatDateDirective],
  templateUrl: './saleorder.component.html',
  styleUrl: './saleorder.component.scss'
})


export class SaleorderComponent implements OnInit {
  maHoaDon: string = "";
  isExpanded: boolean = false;
  title: any;
  products!: any[];
  selectedProduct!: any;
  totalRows: number = 30;
  pageSize: number = 5;
  pageIndex: number = 1;
  IsShowPopupDelete: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  filters!: filters;
  data: DataResult = {
    saleInvoiceOrders: []
  }
  constructor(private route: ActivatedRoute, private router: Router, protected utilsService: UtilsService, private messageService: MessageService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -1),
      toDate: this.utilsService.getToDate(),
      searchString: "",
      customerId: "",
      paymentMethodId: "",
      cartId: "",
      employeeId: "",
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
      FromDate: this.filters.fromDate,
      ToDate: this.filters.toDate,
      MaKhachHang: this.filters.customerId,
      MaNV: this.filters.employeeId,
      MaGioHang: this.filters.cartId,
      MaHinhThuc: this.filters.paymentMethodId
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "getAllSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.saleInvoiceOrders = response.data.saleInvoiceList;
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
  deleteSaleInvoiceOrder() {
    const body = {
      MaHoaDon: this.maHoaDon
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "DeleteSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.IsShowPopupDelete = false;
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công', life: 1000 });
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.globalService.OffLoadpage();
      }
    });
  }
  exportExcel() {
    // if (!this.selectedProducts.length) {
    //   this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Chưa chọn sản phẩm nào để xuất.' });
    //   return;
    // }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.data.saleInvoiceOrders);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "saleoInvoiceOrders");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
  showDialog(maHoaDon: any) {
    this.IsShowPopupDelete = true;
    this.maHoaDon = maHoaDon;
  }
  close() {
    this.IsShowPopupDelete = false;
  }
}
