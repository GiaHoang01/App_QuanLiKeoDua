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

interface DataResult {
  product: any,
  productList: any[],
  price:any,
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SelectModule,AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  isExpanded: boolean = false;
  maHangHoa: string = "";
  title: any;
  selectedProduct!: any;
  pageSize: number = 5;
  pageIndex: number = 1;
  value: string = "";
  IsShowPopupEdit: boolean = false;
  IsUpdate: boolean = false;
  loaiHangHoa = [
    { label: "Vui lòng chọn ", value: "" },
    { label: "Kẹo dừa truyền thống", value: "CAT001" },
    { label: "Kẹo dừa dẻo", value: "CAT002" },
    { label: "Kẹo dừa tổng hợp", value: "CAT003" },
    { label: "Bánh kẹo tổng hợp", value: "CAT004" },
  ];
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  data: DataResult = {
    product: {},
    productList: [],
    price:{},
  }
  searchString: string = "";
  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService,) {
  }

  ngOnInit(): void {
    this.getData
  }
  showUpdate(row:any) {
    this.data.product=row;
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.product = {};
    this.IsUpdate=false;
    this.IsShowPopupEdit = true;
  }

  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getAllProduct", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.productList = response.data.productList;
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
  DeleteProduct(maHangHoa: string) {
    const body = {
      maHangHoa: maHangHoa,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "DeleteProduct", body).subscribe({
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

  AddAccountEmployee(isClose: boolean) {
    const body = {
      NhanVienTaiKhoan: this.data.employee
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "AddAccountEmployee", body).subscribe({
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

  UpdateAccountEmployee(isClose: boolean) {
    const body = {
      NhanVienTaiKhoan: this.data.employee,
      MaNV: this.maNV
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "UpdateEmployee", body).subscribe({
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

  saveEmployee(isClose: boolean) {
    if (isClose) {
      if (this.IsUpdate) {
        this.UpdateAccountEmployee(isClose);
      }
      else {
        this.AddAccountEmployee(isClose);
      }
    }
    else {
      if (this.IsUpdate) {
        this.UpdateAccountEmployee(isClose);
      }
      else {
        this.AddAccountEmployee(isClose);
      }
    }
  }

  closeDialog() {
    this.IsShowPopupEdit = false;
  }
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
