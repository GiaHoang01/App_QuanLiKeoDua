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
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';


interface DataResult {
  product: any,
  products: any[],
}

@Component({
  selector: 'app-stock',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [Ripple,ToastModule,SelectModule, AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective, DropdownModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  isExpanded: boolean = false;
  title: any;
  selectedProduct!: any;
  selectedProducts: any[] = []; 
  pageSize: number = 5;
  pageIndex: number = 1;
  value: string = "";
  data: DataResult = {
    product: {},
    products: [],
  }
  searchString: string = "";

  constructor(private messageService:MessageService,private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }
  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getAllProductInStock", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.products = response.data.productList;
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
  exportExcel() {
    // if (!this.selectedProducts.length) {
    //   this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Chưa chọn sản phẩm nào để xuất.' });
    //   return;
    // }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.data.products);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
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
}
