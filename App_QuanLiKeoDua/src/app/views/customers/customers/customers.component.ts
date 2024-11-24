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

interface DataResult {
  customer: any,
  customers: any[],
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SelectModule, AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective, DropdownModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  isExpanded: boolean = false;
  maKH: string = "";
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
    customer: {},
    customers: [],
  }
  searchString: string = "";

  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  showDetail(maKH: string) {
    this.GetCustomerByID(maKH);
    this.maKH = maKH;
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.customer = {};
    this.IsUpdate = false;
    this.IsShowPopupEdit = true;
  }

  getData() {
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
          this.data.customer = response.data.khachHang;
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

  DeleteCustomer(maKH: string) {
    const body = {
      MaKhachHang: maKH,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "DeleteCustomer", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
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

  AddCustomer(isClose: boolean) {
    const body = {
      KhachHang: this.data.customer
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "AddCustomer", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          if (isClose) {
            this.IsShowPopupEdit = false;
            this.IsUpdate = false;
            this.getData();
          }
          else {
            this.IsUpdate = false;
            this.getData();
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

  UpdateCustomer(isClose: boolean) {
    const body = {
      KhachHang: this.data.customer,
    };
    this.apiService.callAPI(API_ENDPOINT.CUSTOMER_ENDPOINT.CUSTOMER + "UpdateCustomer", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          if (isClose) {
            this.IsUpdate = false;
            this.IsShowPopupEdit = false;
            this.getData();
          }
          else {
            this.IsUpdate = false;
            this.getData();
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

  saveCustomer(isClose: boolean) {
    if (isClose) {
      if (this.IsUpdate) {
        this.UpdateCustomer(isClose);
      }
      else {
        this.AddCustomer(isClose);
      }
    }
    else {
      if (this.IsUpdate) {
        this.UpdateCustomer(isClose);
      }
      else {
        this.AddCustomer(isClose);
      }
    }
  }

  closeDialog() {
    this.IsShowPopupEdit = false;
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
