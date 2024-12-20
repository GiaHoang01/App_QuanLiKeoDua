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
import { AuthService } from '../../../../scss/services/Auth.service';

interface filters extends TransactionFilter
{
  customerId:any,
  cartId:any,
  employeeId:any,
  paymentMethodId:any,
}
interface DataResult {
  promotionList: any[],
}
@Component({
  selector: 'app-promotion',
  standalone: true,
  providers: [MessageService],
  imports: [RouterModule,ToastModule,ButtonModule,TableModule, CommonModule, PaginatorComponent,DialogModule, DatePickerComponent,FormsModule,FormatDateDirective],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent {
  maKhuyenMai:string="";
  isExpanded: boolean = false;
  title: any;
  products!: any[];
  selectedProduct!: any;
  totalRows: number = 30;
  pageSize: number = 5;
  pageIndex: number = 1;
  IsShowPopupDelete:boolean=false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  filters!: filters;
  data: DataResult = {
    promotionList: []
  }
  constructor(public authService: AuthService,private route: ActivatedRoute,private router:Router,protected utilsService: UtilsService,private messageService: MessageService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.filters = {
      fromDate: this.utilsService.DateAdd(new Date(), -1),
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
    };
    this.apiService.callAPI(API_ENDPOINT.PROMOTION_ENDPOINT.PROMOTION + "getAllPromotion", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.promotionList = response.data.promotionList;
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
     MaKhuyenMai:this.maKhuyenMai
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.PROMOTION_ENDPOINT.PROMOTION + "DeletePromotion", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.IsShowPopupDelete=false;
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công',life:1000 });
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
  showDialog(maKhuyenMai:any)
  {
    this.IsShowPopupDelete=true;
    this.maKhuyenMai=maKhuyenMai;
  }
  close()
  {
    this.IsShowPopupDelete=false;
  }
}
