import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerComponent } from '../../../../components/datepicker/datepicker.component';
import { FormatDateDirective } from '../../../../directive/date-format.directive';
import { APIService } from '../../../../../scss/services/api.service';
import { GlobalService } from '../../../../../scss/services/global.service';
import { UtilsService } from '../../../../../scss/services/untils.service';
import { TableModule } from 'primeng/table';
import { API_ENDPOINT } from '../../../../../environments/environments';
import { AppQuickSearchComponent } from '../../../../components/app-quick-search/app-quick-search.component';
import { SidebarModule } from 'primeng/sidebar'; 
import { NgScrollbarModule } from 'ngx-scrollbar'; 
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';

interface DataResult {
  saleInvoiceOrder:any,
  saleInvoiceOrderDetail: any[],
  employees:[],
  customers:[],
  products:[]
}

interface Filters{
  tenKH:any,
  tenNV:any
}

@Component({
  selector: 'app-saleorder-detail',
  standalone: true,
  imports: [ SidebarModule,ToastModule,Ripple,SelectModule,DropdownModule,
    NgScrollbarModule,RouterModule,CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective,TableModule,AppQuickSearchComponent],
  providers: [MessageService],
  templateUrl: './saleorder-detail.component.html',
  styleUrl: './saleorder-detail.component.scss'
})
export class SaleorderDetailComponent {
  id: string | null = null;
  status:number=0;
  constructor(private route: ActivatedRoute,private router: Router,private messageService: MessageService,
  protected utilsService: UtilsService,private apiService: APIService,
   protected globalService: GlobalService) { }
  data: DataResult = {
    saleInvoiceOrder:{},
    saleInvoiceOrderDetail: [],
    customers:[],
    employees:[],
    products:[]
  }
  hinhThuc = [
    { label: "Chuyển khoản", value: "CK" },
    { label: "Thanh toán khi nhận hàng", value: "COD" },
    { label: "Tiền mặt", value: "TM" },
  ];
  filter:Filters={
    tenKH:"",
    tenNV:"",
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.status = params['status'];
    });
    this.quickSearchNhanVien();
    this.quickSearchHangHoa();
    this.quickSearchKhachHang();
    this.getData();
  }
  getData() {
    const body = {
      MaHoaDon:this.id,
      Status:this.status
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
  save() {
    const body = {
      HoaDonBanHang:this.data.saleInvoiceOrder,
      CTHoaDonBanHang:this.data.saleInvoiceOrderDetail,
      Status:2
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "SaveSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lưu thành công',life:1000 });
        } else {
          this.messageService.add({severity: 'error',summary: 'Lỗi',detail: 'Lưu thất bại',life: 1000});
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }
  ConfirmSaleInvoiceFinish()
  {
    const body = {
      MaHoaDon: this.data.saleInvoiceOrder.maHoaDon,
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "ConfirmSaleInvoiceFinish", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
        } else {
          this.messageService.add({severity: 'error',summary: 'Lỗi',detail: 'Lưu thất bại',life: 1000});
        }
      },
      
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }
  ConfirmCancelSaleInvoice()
  {
    const body = {
      MaHoaDon: this.data.saleInvoiceOrder.maHoaDon,
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "ConfirmCancelSaleInvoice", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:response.message,life:1000 });
        } else {
          this.messageService.add({severity: 'error',summary: 'Lỗi',detail: 'Lưu thất bại',life: 1000});
        }
      },
      
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

      }
    });
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

  quickSearchNhanVien(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "quickSearchNhanVien", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.employees = response.data.nhanViens;
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
  quickSearchKhachHang(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "quickSearchKhachHang", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.customers = response.data.khachHangs;
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
  url:string="";
  PayVnPay()
  {
    const paymentInformation = {
      orderType: "Sale",         
      amount: this.data.saleInvoiceOrder.tongTriGia,      
      orderDescription: "Chuyển tiền đơn đặt hàng",  
      name: this.filter.tenKH
  };
    const body = {
      ...paymentInformation
    };
    this.apiService.callAPI(API_ENDPOINT.PAYMENT_ENDPOINT.PAYMENT + "", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.url = response.data.url;
          window.location.href = this.url;
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

  quickSearchHangHoa(searchString:string ="")
  {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "quickSearchHangHoa", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.products = response.data.hangHoas;
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

  validateSoLuong(item: any) {
    const body = {
      MaHangHoa: item.maHangHoa,
    };
  
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getSoLuongTon", body).subscribe({
      next: (response: any) => {
        const soLuongTon = response.status === 1 ? response.data.soLuongTon : 0;
        if (item.soLuong > soLuongTon) {
          item.soLuong = soLuongTon;
        }
      },
      error: (error: any) => {
        console.error("Lỗi khi gọi API: ", error);
      },
    });
  }
  
  onAddRow() {
    let tempItem = {
     maHang:"",
     tenHang:"",
     soLuong:0,
     donGia:0,
     thanhTien:0
    };
    this.data.saleInvoiceOrderDetail.push(tempItem);
  }

  editableRowIndex: number | null = null;
  deleteRow(index: number): void {
    this.data.saleInvoiceOrderDetail.splice(index, 1);
    if (this.editableRowIndex === index) {
      this.editableRowIndex = null;
    }
  }

  onSelectItem(itemSelected: any, item: any) {
    this.data.saleInvoiceOrderDetail[item].maHangHoa = itemSelected.maHangHoa;
    this.data.saleInvoiceOrderDetail[item].tenHangHoa = itemSelected.tenHangHoa;
    this.data.saleInvoiceOrderDetail[item].soLuong = 1;
    this.data.saleInvoiceOrderDetail[item].donGia = itemSelected.giaBan;
    this.data.saleInvoiceOrderDetail[item].thanhTien = itemSelected.giaBan*this.data.saleInvoiceOrderDetail[item].soLuong;
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
  
  addNew()
  {
    this.router.navigate(['/saleorder/saleOrderAdd'], {
      queryParams: { id: '', status: 1 },
    });
    this.id = null;
    this.status = 1; 
    this.data.saleInvoiceOrder = {};
    this.data.saleInvoiceOrderDetail = [];
    this.filter = { tenKH: '', tenNV: '' };
    this.quickSearchNhanVien();
    this.quickSearchHangHoa();
    this.quickSearchKhachHang();
    this.getData();
    
  }

  calculateThanhTien(item: any): void {
    item.thanhTien = item.soLuong * item.donGia;
    this.calculateTotal();
  }
  calculateTotal() {
    if (!this.data.saleInvoiceOrderDetail || this.data.saleInvoiceOrderDetail.length === 0) {
      this.data.saleInvoiceOrder.tongTriGia=0;
    }
    this.data.saleInvoiceOrder.tongTriGia= this.data.saleInvoiceOrderDetail.reduce((total, item) => total + (item.thanhTien || 0), 0);
  }
  
}
