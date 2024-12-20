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


interface filters extends TransactionFilter{}

interface DataResult {
  shippingNotes: any[],
}

@Component({
  selector: 'app-shipping-note-confirm',
  standalone: true,
  imports: [RouterModule,ButtonModule,TableModule, CommonModule, PaginatorComponent, DatePickerComponent,FormsModule,FormatDateDirective],
  templateUrl: './shipping-note-confirm.component.html',
  styleUrl: './shipping-note-confirm.component.scss'
})
export class ShippingNoteConfirmComponent implements OnInit {
  isExpanded: boolean = false;
  title: any;
  selectedRow!: any;
  totalRows: number = 0;
  pageSize: number = 1;
  pageIndex: number = 1;
  data: DataResult = {
    shippingNotes: []
  }
  filters!: filters;
  searchString:string="";

  currentDate!: string;
  constructor(private route: ActivatedRoute,private router:Router,protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }
  
  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -1),
      toDate: this.utilsService.getToDate(),
      searchString: ""
    };

    // Lấy ngày hiện tại dưới dạng chuỗi yyyy-MM-dd để so sánh
    const now = new Date();
    this.currentDate = now.toISOString().split('T')[0];
  }
  
  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
      FromDate:this.filters.fromDate,
      ToDate:this.filters.toDate
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE + "getAllShippingNote", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          //this.data.shippingNotes = response.data.shippingNotes;
          this.data.shippingNotes = response.data.shippingNotes.filter((note: any) => 
            note.TrangThai !== "Hoàn tất" && note.TrangThai !== "Chưa hoàn tất"
          );
          this.globalService.paging.TotalRows = this.data.shippingNotes.length;
          console.log("Trạng thái", this.data.shippingNotes);
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
  // // Toggle để phóng to/thu nhỏ phần bộ lọc
  // toggleExpansion() {
  //   this.isExpanded = !this.isExpanded;
  // }

  getStatusByDate(ngayGiao: string, trangThai: string): string {
    if (trangThai !== 'Mới tạo') {
      return ''; // Không tô màu nếu trạng thái khác "Mới tạo"
    }
  
    const currentDate = new Date(); // Ngày hiện tại
    const ngayGiaoDate = new Date(ngayGiao); // Chuyển đổi sang kiểu Date
  
    // Chỉ lấy phần ngày để so sánh
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const ngayGiaoDateOnly = new Date(ngayGiaoDate.getFullYear(), ngayGiaoDate.getMonth(), ngayGiaoDate.getDate());
  
    if (ngayGiaoDateOnly > currentDateOnly) {
      return 'DotRowGreen'; // Chưa tới ngày giao
    } else if (ngayGiaoDateOnly < currentDateOnly) {
      return 'DotRowRed'; // Quá ngày giao
    } else {
      return 'DotRowBlue'; // Tới ngày giao
    }
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
