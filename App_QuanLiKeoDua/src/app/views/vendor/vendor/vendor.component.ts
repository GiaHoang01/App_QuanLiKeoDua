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
import { AuthService } from '../../../../scss/services/Auth.service';
interface DataResult {
  vendor: any,
  vendors: any[],
}

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [Ripple,ToastModule,SelectModule, AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective, DropdownModule],
  templateUrl: './vendor.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './vendor.component.scss'
})
export class VendorComponent implements OnInit {
  isExpanded: boolean = false;
  maNCC: string = "";
  title: any;
  selectedProduct!: any;
  pageSize: number = 5;
  pageIndex: number = 1;
  value: string = "";
  gioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];
  loaiKH = [
    { label: "Khách hàng mới", value: "TIER01" },
    { label: "Khách hàng thân thiết", value: "TIER02" },
    { label: "Khách hàng lâu năm", value: "TIER03" },
  ];

  getLoaiKhachHangLabel(maLoaiKH: string): string {
    const loai = this.loaiKH.find(item => item.value === maLoaiKH);
    return loai ? loai.label : "Không xác định";
  }

  IsShowPopupEdit: boolean = false;
  IsUpdate: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  data: DataResult = {
    vendor: {},
    vendors: [],
  }
  searchString: string = "";

  constructor(public authService: AuthService,private messageService:MessageService,private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  showDetail(maNCC: string) {
    this.GetVendorByID(maNCC);
    this.maNCC = maNCC;
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.vendor = {};
    this.IsUpdate = false;
    this.IsShowPopupEdit = true;
  }

  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "getAllVendors", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.vendors = response.data.vendors;
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

  GetVendorByID(maNCC: string) {
    const body = {
      MaNCC: maNCC,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "GetVendorByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.vendor = response.data.vendor;
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

  DeleteVendor(maNCC: string) {
    const body = {
      MaNCC: maNCC,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "DeleteVendor", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công',life:1000 });
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

  AddVendor(isClose: boolean) {
    const body = {
      NhaCungCap: this.data.vendor
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "AddVendor", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          if (isClose) {
            this.IsShowPopupEdit = false;
            this.IsUpdate = false;
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công',life:1000 });
          }
          else {
            this.data.vendor={};
            this.IsUpdate = false;
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công',life:1000 });
          }
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

  UpdateVendor(isClose: boolean) {
    const body = {
      NhaCungCap: this.data.vendor,
    };
    this.apiService.callAPI(API_ENDPOINT.VENDOR_ENDPOINT.VENDOR + "UpdateVendor", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          if (isClose) {
            this.IsUpdate = false;
            this.IsShowPopupEdit = false;
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công',life:1000 });
          }
          else {
            this.IsUpdate = false;
            this.data.vendor={};
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công',life:1000 });
          }
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

  saveVendor(isClose: boolean) {
    if (isClose) {
      if (this.IsUpdate) {
        this.UpdateVendor(isClose);
      }
      else {
        this.AddVendor(isClose);
      }
    }
    else {
      if (this.IsUpdate) {
        this.UpdateVendor(isClose);
      }
      else {
        this.AddVendor(isClose);
      }
    }
  }

  closeDialog() {
    this.IsShowPopupEdit = false;
    this.data.vendor={};
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
