import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { API_ENDPOINT } from '../../../../environments/environments';
import { APIService } from '../../../../scss/services/api.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule,SelectModule,CommonModule, TabsModule,TableModule,DropdownModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  quyen!: any[];
  nhomQuyen!: any[];
  dsTenNV!:any[];
  tenNhanVien:string="";
  constructor(private route: ActivatedRoute,private apiService: APIService){}
  ngOnInit(): void {
    this.getAllNameEmployees();
    this.GetNhomQuyenByTenNV();
    this.GetQuyenByMaNhomQuyen();
  }

  GetQuyenByMaNhomQuyen(tenNhanVien:string="") {
    const body = {
      TenNV:tenNhanVien
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "GetQuyenByTenNV", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.quyen = response.data.quyens;
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

  GetNhomQuyenByTenNV(tenNV:string="") {
    const body = {
      TenNV:tenNV
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "GetNhomQuyenByTenNV", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.nhomQuyen = response.data.nhomQuyens;
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

  getAllNameEmployees() {
    const body = {
    };
    this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "getAllNameEmployees", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
            this.dsTenNV = response.data.nameEmployees;
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

  onNhanVienChange(event: any): void {
    const selectedNhanVien = this.tenNhanVien;
    this.GetNhomQuyenByTenNV(selectedNhanVien);
    this.GetQuyenByMaNhomQuyen(selectedNhanVien);
  }
}
