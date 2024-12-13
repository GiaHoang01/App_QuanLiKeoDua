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

interface filters extends TransactionFilter{}

interface DataResult {
  shippingNotesCancel: any[],
}

@Component({
  selector: 'app-shipping-note-cancel',
  standalone: true,
  imports: [RouterModule,ButtonModule,TableModule, CommonModule, PaginatorComponent, DatePickerComponent,FormsModule,FormatDateDirective],
  templateUrl: './shipping-note-cancel.component.html',
  styleUrl: './shipping-note-cancel.component.scss'
})
export class ShippingNoteCancelComponent implements OnInit {
  isExpanded: boolean = false;
  title: any;
  selectedRow!: any;
  totalRows: number = 0;
  pageSize: number = 1;
  pageIndex: number = 1;
  
  data: DataResult = {
    shippingNotesCancel: []
  }
  filters!: filters;
  searchString:string="";

  constructor(private route: ActivatedRoute,private router:Router,protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService, private messageService:MessageService) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -7),
      toDate: this.utilsService.getToDate(),
      searchString: ""
    };
  }
  
  getData() {
    const body = {
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
      FromDate:this.filters.fromDate,
      ToDate:this.filters.toDate
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE_CANCEL + "getAllShippingNoteCancel", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.shippingNotesCancel = response.data.shippingNotesCancel;
          
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

  deleteShippingNoteCancel(maPhieuHuy: any) {
    const body = {
      MaPhieuHuy: maPhieuHuy,
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE_CANCEL + "DeleteShippingNoteCancel", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công', life: 1000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại', life: 1000 });
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
