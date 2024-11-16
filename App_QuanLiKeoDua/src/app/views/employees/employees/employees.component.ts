import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownComponent } from "../../../components/dropdown/dropdown.component";
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


interface DataResult {
  employee: any,
  employees: any[]
}
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [DatePickerComponent,ButtonModule, DropdownComponent, TableModule, CommonModule, PaginatorComponent, FormsModule,DialogModule,FormatDateDirective],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  isExpanded: boolean = false;
  title: any;
  selectedProduct!: any;
  pageSize: number = 5;
  pageIndex: number = 1;
  value:string="";
  gioiTinh = [
    { label:"Vui lòng chọn ", value :""},
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];
  IsShowPopupEdit:boolean=false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  data: DataResult = {
    employee: {},
    employees:[]
  }
  searchString: string="";
  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService,) {
  }

  ngOnInit(): void {
   
  }
  showDetail(maNV:string)
  {
    this.GetEmployeeByID(maNV);
    this.IsShowPopupEdit=true;
  }

  showAdd()
  {
    this.data.employee={};
    this.IsShowPopupEdit=true;
  }

  getData() {
    const body = {
      SearchString:this.searchString,
      PageSize:this.globalService.paging.PageSize,
      PageIndex:this.globalService.paging.PageIndex,
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

  GetEmployeeByID(maNV:string) {
    const body = {
      MaNV:maNV,
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "GetEmployeeByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.employee = response.data.employeeAccount;
          console.log(this.data.employee);
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

  DeleteEmployee(maNV:string) {
    const body = {
      MaNV:maNV,
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

  AddAccountEmployee() {
    const body = {
      NhanVienTaiKhoan:this.data.employee
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "AddAccountEmployee", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.IsShowPopupEdit=false;
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

  closeDialog()
  {
    this.IsShowPopupEdit=false;
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
