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
import { AuthService } from '../../../../../scss/services/Auth.service';
interface DataResult {
  purchase: any,
  purchaseOrderDetail: any[],
  employees: [],
  vendors: [],
  products: []
}

interface Filters {
  tenNCC: any,
  tenNV: any
}

@Component({
  selector: 'app-confirm-purchase-order-detail',
  standalone: true,
  imports: [SidebarModule, ToastModule, Ripple,
    NgScrollbarModule, RouterModule, CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective, TableModule, AppQuickSearchComponent],
  providers: [MessageService],
  templateUrl: './confirm-purchase-order-detail.component.html',
  styleUrl: './confirm-purchase-order-detail.component.scss'
})

export class ConfirmPurchaseOrderDetailComponent implements OnInit {
  id: string | null = null;
  status: number = 0;
  constructor(public authService: AuthService,private route: ActivatedRoute, private router: Router, private messageService: MessageService,
    protected utilsService: UtilsService, private apiService: APIService,
    protected globalService: GlobalService) { }
  data: DataResult = {
    purchase: {},
    purchaseOrderDetail: [],
    vendors: [],
    employees: [],
    products: []
  }

  filter: Filters = {
    tenNCC: "",
    tenNV: "",
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.status = params['status'];
    });
    this.quickSearchNhanVien();
    this.quickSearchNhaCungCap();
    this.quickSearchHangHoa();
    this.getData();
  }

  getData() {
    const body = {
      MaPhieuNhap: this.id,
      Status: this.status
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "getPurchaseOrderRequest_ByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          if (this.status == 2) {
            this.data.purchase = response.data.phieuNhap;
            this.data.purchaseOrderDetail = response.data.chiTietPhieuNhap;
            this.SearchTenNCC_ByMaNCC(response.data.phieuNhap.maNCC);
            this.GetEmployeeByID(response.data.phieuNhap.maNV);
            this.data.purchaseOrderDetail.forEach((item, index) => {
              this.initEdit(item, index);
            });
          }
          else {
            this.data.purchaseOrderDetail.forEach((item, index) => {
              this.initEdit(item, index);
            });
            this.data.purchase = response.data.phieuNhap;
            this.data.purchaseOrderDetail = response.data.chiTietPhieuNhap;
          }
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

  confirm() {
    const body = {
      PurchaseOrder: this.data.purchase,
      PurchaseOrderDetail: this.data.purchaseOrderDetail
    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "ConfirmPurchaseOrder", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lưu thành công', life: 1000 });
          this.getData();
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

  SearchTenNCC_ByMaNCC(maNCC: string) {
    const body = {
      MaNCC: maNCC,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "searchNhaCungCap_byMaNCC", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.filter.tenNCC = response.data.tenNCC;
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

  quickSearchNhaCungCap(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "quickSearchNhaCungCap", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.vendors = response.data.nhaCungCaps;
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

  quickSearchHangHoa(searchString: string = "") {
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
  

  onAddRow() {
    let tempItem = {
      maHang: "",
      tenHang: "",
      soLuong: 0,
      donGia: 0,
      thanhTien: 0
    };
    this.data.purchaseOrderDetail.push(tempItem);
  }

  editableRowIndex: number | null = null;
  deleteRow(index: number): void {
    this.data.purchaseOrderDetail.splice(index, 1);
    if (this.editableRowIndex === index) {
      this.editableRowIndex = null;
    }
  }

  onSelectItem(itemSelected: any, item: any) {
    this.data.purchaseOrderDetail[item].maHangHoa = itemSelected.maHangHoa;
    this.data.purchaseOrderDetail[item].tenHangHoa = itemSelected.tenHangHoa;
    this.data.purchaseOrderDetail[item].soLuong = 1;
    this.data.purchaseOrderDetail[item].soLuongDat = 1;
    this.data.purchaseOrderDetail[item].donGia = 0;
    this.data.purchaseOrderDetail[item].thanhTien = 0;
  }


  initEdit(itemSelected: any, index: number) {
    this.data.purchaseOrderDetail[index].maHangHoa = itemSelected.maHangHoa;
    this.getTenHangHoa_withByMaHangHoa(itemSelected.maHangHoa, (tenHangHoa: string) => {
      this.data.purchaseOrderDetail[index].tenHangHoa = tenHangHoa;
      this.data.purchaseOrderDetail[index].soLuongDat = itemSelected.soLuongDat;
      this.data.purchaseOrderDetail[index].soLuong = itemSelected.soLuong;
      this.data.purchaseOrderDetail[index].donGia = itemSelected.donGia;
      this.data.purchaseOrderDetail[index].thanhTien = itemSelected.thanhTien;
    });
  }

  addNew() {
    this.router.navigate(['/purchaseOrderRequest/purchaseOrderRequestAdd'], {
      queryParams: { id: '', status: 1 },
    });
  }

  calculateThanhTien(item: any): void {
    item.thanhTien = item.soLuong * item.donGia;
    this.calculateTotal();
  }
  
  calculateTotal() {
    if (!this.data.purchaseOrderDetail || this.data.purchaseOrderDetail.length === 0) {
      this.data.purchase.tongTriGia = 0;
    }
    this.data.purchase.tongTriGia = this.data.purchaseOrderDetail.reduce((total, item) => total + (item.thanhTien || 0), 0);
  }

}
