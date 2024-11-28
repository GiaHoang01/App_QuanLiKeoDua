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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
  saleInvoiceOrderDetail:any[],
  employees:any[]
}
interface Filters{
  tenKH:any,
  tenNV:any
}

@Component({
  selector: 'app-confirmsaleorder',
  standalone: true,
  providers: [MessageService],
  imports: [SelectModule,AppQuickSearchComponent,ToastModule, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective],
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
  filter:Filters={
    tenNV:"",
    tenKH:"",
  }
  filters!:filters
  data: DataResult = {
    saleInvoiceOrders: [],
    saleInvoiceOrder:{},
    saleInvoiceOrderDetail:[],
    employees:[]
  }
  constructor(private route: ActivatedRoute,protected utilsService: UtilsService,private messageService: MessageService,
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
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
      }
    });
    this.quickSearchNhanVien();
  }
  getDetail(maHoaDon:string) {
    const body = {
      MaHoaDon:maHoaDon,
      Status:2
    };
  this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "getSaleInvoice_ByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.saleInvoiceOrder = response.data.hoaDonBanHang;
          this.data.saleInvoiceOrderDetail=response.data.chiTietHoaDonBanHang;
          // this.SearchTenNCC_ByMaNCC(response.data.phieuNhap.maNCC);
          this.GetCustomerByID(response.data.hoaDonBanHang.maKhachHang);
          this.GetEmployeeByID(response.data.hoaDonBanHang.maNV);
          this.data.saleInvoiceOrderDetail.forEach((item, index) => {
            this.initEdit(item, index);
          });
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
  initEdit(itemSelected: any, index: number) {
    this.data.saleInvoiceOrderDetail[index].maHangHoa = itemSelected.maHangHoa;
    this.getTenHangHoa_withByMaHangHoa(itemSelected.maHangHoa, (tenHangHoa: string) => {
      this.data.saleInvoiceOrderDetail[index].tenHangHoa = tenHangHoa;
      this.data.saleInvoiceOrderDetail[index].soLuong = itemSelected.soLuong;
      this.data.saleInvoiceOrderDetail[index].donGia = itemSelected.donGia;
      this.data.saleInvoiceOrderDetail[index].thanhTien = itemSelected.thanhTien;
    });
  }
  // quickSearchHangHoa(searchString: string = "") {
  //   const body = {
  //     SearchString: searchString,
  //   };
  //   this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "quickSearchHangHoa", body).subscribe({
  //     next: (response: any) => {
  //       if (response.status == 1) {
  //         this.data.products = response.data.hangHoas;
  //       } else {

  //       }
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //     complete: () => {

  //     }
  //   });
  // }

  getTenHangHoa_withByMaHangHoa(maHangHoa: string, callback: (tenHangHoa: string) => void) {
    const body = {
      MaHangHoa: maHangHoa,
    };

    this.apiService
      .callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getTenHangHoa_withByMaHangHoa", body)
      .subscribe({
        next: (response: any) => {
          if (response.status === 1) {
            callback(response.data.tenHangHoa); 
          } else {
            console.log("Không lấy được tên hàng hóa");
          }
        },
        error: (error: any) => {
          console.error("Lỗi khi gọi API: ", error);
        },
      });
  }
  quickSearchNhanVien(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "quickSearchNhanVien", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.employees = response.data.nhanViens;
          console.log(this.data.employees)
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
  closeDialog() {
    this.IsShowPopupEdit = false;
  }
  showUpdate(maHoaDon:string) {
    //this.data.saleInvoiceOrder=deepCopy(row);
    this.getDetail(maHoaDon);
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.saleInvoiceOrder = {};
    this.IsUpdate=false;
    this.IsShowPopupEdit = true;
  }
  GetEmployeeByID(maNV: string) {
    const body = {
      MaNV: maNV,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "GetEmployeeByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.filter.tenNV = response.data.employeeAccount.tenNV;
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
  GetCustomerByID(maKH: string) {
    const body = {
      MaKH: maKH,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "GetCustomerByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.filter.tenKH = response.data.khachHang.tenKhachHang;
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
  ConfirmSaleInvoice()
  {
    const body = {
      MaHoaDon: this.data.saleInvoiceOrder.maHoaDon,
      MaNV:this.data.saleInvoiceOrder.maNV
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "ConfirmSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
          this.closeDialog();
          this.getData();
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
          this.closeDialog();
          this.getData();
        }
      },
      
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }
  CancelSaleInvoice()
  {
    const body = {
      MaHoaDon: this.data.saleInvoiceOrder.maHoaDon,
      MaNV:this.data.saleInvoiceOrder.maNV
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "CancelSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
          this.closeDialog();
          this.getData();
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
          this.closeDialog();
          this.getData();
        }
      },
      
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }
}
