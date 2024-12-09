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
import { AuthService } from '../../../../scss/services/Auth.service';

interface DataResult {
  customer: any, // thông tin chi tiết của khách hàng
  customers: any[], // danh sách các khách hàng
  addressSave: any // làm biến để lưu địa chỉ mới cho khách hàng
  addressShow: any[], // hiển thị danh sách địa chỉ
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SelectModule, AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective, DropdownModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent /*implements OnInit*/ {
  //isExpanded: boolean = false;
  maKH: string = "";
  title: any;
  selectedCustomer!: any;
  pageSize: number = 5;
  pageIndex: number = 1;
  value: string = "";
  searchString: string = "";
  selectedAddress: boolean | null = null;

  gioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  loaiKH = [
    { label: "Khách hàng mới", value: "TIER01" },
    { label: "Khách hàng thân thiết", value: "TIER02" },
    { label: "Khách hàng lâu năm", value: "TIER03" },
  ];

  getLoaiKhachHang(maLoaiKH: string): string {
    const loai = this.loaiKH.find(item => item.value == maLoaiKH);
    return loai ? loai.label : "Không xác định";
  }

  showShippingInfo: boolean = false;
  IsShowPopupEdit: boolean = false; //popup hiển thị
  IsUpdate: boolean = false; //false: Thêm mới, true: Chỉnh sửa

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];

  data: DataResult = {
    customer: {},
    customers: [],
    addressSave: {},
    addressShow: [],
  }

  constructor(public authService: AuthService,private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  // ngOnInit(): void {
  // }

  ShowDetail(maKH: string) {
    this.GetCustomerByID(maKH);
    this.maKH = maKH;
    this.getDataAdressByCustomer();
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.customer = {};
    this.IsUpdate = false;
    this.IsShowPopupEdit = true;
  }

  getDataCustomer() { //lấy tất cả khách hàng
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "getAllCustomers", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.customers = response.data.customers;
        } else {
          console.log("Lỗi khi call API: getAllCustomers");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => { }
    });
  }

  GetCustomerByID(maKH: string) { //Lấy chi tiết khách hàng
    const body = {
      MaKH: maKH,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "GetCustomerByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          // Cập nhật thông tin khách hàng
          this.data.customer = response.data;
          this.selectedAddress = this.data.customer.shippingInfos.find((x: any) => x.macDinh == true)?.macDinh || null;
        } else {
          console.error("Không tìm thấy khách hàng.");
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getDataAdressByCustomer() { // lấy địa chỉ theo khách hàng
    const body = {
      MaKhachHang: this.maKH
    };
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_INFO + "getAllInfoDelivery", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.addressShow = response.data.shippingInfo;
          console.log("address-show", this.data.addressShow);
        } else {
          console.log("Lỗi khi call API: getAllInfoDelivery");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => { }
    });
  }

  DeleteCustomer(maKH: string) {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa khách hàng này không?");

    if (isConfirmed) {
      const body = {
        MaKhachHang: maKH,
      };
      this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "DeleteCustomer", body).subscribe({
        next: (response: any) => {
          if (response.status == 1) {
            this.getDataCustomer();
          } else {
            console.log("Xóa thất bại:", response.message);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  DeleteAddress(maThongTin: string) {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?");

    if (isConfirmed) {
      const body = {
        MaKhachHang: this.maKH,
        MaThongTin: maThongTin
      };
      this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_INFO + "DeleteInfoDelivery", body).subscribe({
        next: (response: any) => {
          if (response.status == 1) {
            //this.getDataCustomer();
            //this.GetCustomerByID(this.maKH);
            this.getDataAdressByCustomer();
          } else {
            console.log("Xóa thất bại:", response.message);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  deleteAddress(index: number): void {
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa khách hàng này không?");
    if (isConfirmed) {
      this.data.addressShow.splice(index, 1); // Xóa địa chỉ ở vị trí index trong mảng
    }
  }

  AddCustomer() {
    const body = {
      KhachHang: this.data.customer
    };
  
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "AddCustomer", body).subscribe({
      next: (response: any) => {
        if (response.status === 1) {
          this.IsShowPopupEdit = false;
          this.IsUpdate = false;
          this.maKH = response.data.maKhachHang; // Gán giá trị
          console.log("Mã khách hàng", this.maKH);
  
          // Gọi AddAddress() sau khi AddCustomer() thành công
          if (this.data.addressSave && Object.keys(this.data.addressSave).length > 0) {
            this.AddAddress();
          }
        } else {
          console.log("AddCustomer failed.");
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  AddAddress() {
    const body = {
      MaKH: this.maKH,
      ThongTinGiaoHang: this.data.addressSave
    };
  
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_INFO + "AddInfoDelivery", body).subscribe({
      next: (response: any) => {
        if (response.status === 1) {
          console.log("this.maKH", this.maKH);
          this.IsShowPopupEdit = false;
          this.IsUpdate = false;
          this.getDataCustomer();
        } else {
          console.log("AddAddress failed.");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {this.data.addressSave = {}, this.showShippingInfo = false;}
    });
  }
  
  UpdateCustomer() {
    const body = {
      KhachHang: this.data.customer,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "UpdateCustomer", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.IsUpdate = false;
          this.IsShowPopupEdit = false;
          //this.getDataCustomer();
          if (this.data.addressSave && Object.keys(this.data.addressSave).length > 0) {
            this.AddAddress();
          }
        } else { }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => { }
    });
  }
  // AddAddress() {
  //   const body = {
  //     MaKH: this.maKH,
  //     ThongTinGiaoHang: this.data.addressSave
  //   };
  //   this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_INFO + "AddInfoDelivery", body).subscribe({
  //     next: (response: any) => {
  //       if (response.status == 1) {
  //         console.log("this.maKH", this.maKH);
  //         this.IsShowPopupEdit = false;
  //         this.IsUpdate = false;
  //         this.getDataCustomer();
  //       } else {
  //         // Xử lý khi lưu địa chỉ giao hàng không thành công
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //     complete: () => { }
  //   });
  // }

  saveCustomerAndAddress() {
    if (this.IsUpdate) {
      this.UpdateCustomer();
    } else {
      this.AddCustomer(); // Gọi AddCustomer, AddAddress sẽ được xử lý bên trong.
    }
    this.getDataCustomer();
    //this.data.addressSave = {};
  }
  


  // AddAddress() {
  //   const body = {
  //     KhachHang: this.data.customer
  //   };
  //   this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "AddCustomer", body).subscribe({
  //     next: (response: any) => {
  //       if (response.status == 1) { 
  //           this.IsShowPopupEdit = false;
  //           this.IsUpdate = false;
  //           this.getDataCustomer();
  //           this.IsUpdate = false;
  //           this.getDataCustomer();
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

  

  // saveCustomer() {
  //   // if (isClose) {
  //   //   if (this.IsUpdate) {
  //   //     this.UpdateCustomer(isClose);
  //   //   }
  //   //   else {
  //   //     this.AddCustomer(isClose);
  //   //   }
  //   // }
  //   // else {
  //   //   if (this.IsUpdate) {
  //   //     this.UpdateCustomer(isClose);
  //   //   }
  //   //   else {
  //   //     this.AddCustomer(isClose);
  //   //   }
  //   // }
  // }

  closeDialog() {
    //this.data.customer = {};
    this.data.addressShow = [];
    this.data.addressSave = {};
    this.IsShowPopupEdit = false;
    this.showShippingInfo = false;
  }

  onPageChange(event: any) {
    this.getDataCustomer();
  }

  onRowsChange(event: any) {
    this.onSearch();
  }

  onSearch(): void {
    this.globalService.paging.PageIndex = 1;
    this.getDataCustomer();
  }

  canSave(): boolean {
    const customer = this.data.customer;

    // Kiểm tra thông tin khách hàng
    const isCustomerValid =
      customer.tenKhachHang?.trim().length > 0 &&
      customer.gioiTinh != null &&
      customer.maLoaiKH != null;

    // Nếu `showShippingInfo` là true, kiểm tra thêm thông tin giao hàng
    if (this.showShippingInfo) {
      const address = this.data.addressSave;
      const isAddressValid =
        !!(address?.sdt?.trim() && address?.soNha?.trim() && address?.phuong?.trim() && address?.quan?.trim());
      return isCustomerValid && isAddressValid;
    }

    // Nếu không cần thông tin giao hàng, chỉ kiểm tra thông tin khách hàng
    return isCustomerValid;
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Loại bỏ tất cả ký tự không phải số
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    // Cập nhật lại model
    this.data.addressSave.sdt = inputElement.value;
  }

}
