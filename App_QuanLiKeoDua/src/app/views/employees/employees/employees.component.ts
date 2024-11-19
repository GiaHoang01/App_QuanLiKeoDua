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
  employee: any,
  employees: any[],
  nhomQuyens: any[]
}
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [SelectModule,AppQuickSearchComponent, DatePickerComponent, ButtonModule, TableModule, CommonModule, PaginatorComponent, FormsModule, DialogModule, FormatDateDirective],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  isExpanded: boolean = false;
  maNV: string = "";
  title: any;
  selectedProduct!: any;
  pageSize: number = 5;
  pageIndex: number = 1;
  value: string = "";
  gioiTinh = [
    { label: "Vui lòng chọn ", value: "" },
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];
  IsShowPopupEdit: boolean = false;
  IsUpdate: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  data: DataResult = {
    employee: {},
    employees: [],
    nhomQuyens: []
  }
  searchString: string = "";
  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService,) {
  }

  ngOnInit(): void {

  }
  showDetail(maNV: string) {
    this.GetEmployeeByID(maNV);
    this.maNV=maNV;
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.employee = {};
    this.IsUpdate=false;
    this.IsShowPopupEdit = true;
  }

  getData() {
    const body = {
      SearchString: this.searchString,
      PageSize: this.globalService.paging.PageSize,
      PageIndex: this.globalService.paging.PageIndex,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "getAllEmployees", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.globalService.paging.TotalRows = response.data.totalRows;
          this.data.employees = response.data.employees;
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
  
  maNhomQuyen: string = "";
  quickSearchNhomQuyen(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "quickSearchNhomQuyen", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.nhomQuyens = response.data.nhomQuyens;
          console.log(this.maNhomQuyen);
          console.log(this.data.nhomQuyens);
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
          this.data.employee = response.data.employeeAccount;
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

  DeleteEmployee(maNV: string) {
    const body = {
      MaNV: maNV,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "DeleteEmployee", body).subscribe({
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
