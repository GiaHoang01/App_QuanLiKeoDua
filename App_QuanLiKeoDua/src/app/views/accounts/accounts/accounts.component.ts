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
import { AppQuickSearchComponent } from '../../../components/app-quick-search/app-quick-search.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { AuthService } from '../../../../scss/services/Auth.service';
@Component({
  selector: 'app-accounts',
  standalone: true,
  providers: [MessageService],
  imports: [ ToastModule,Ripple,AppQuickSearchComponent,FormsModule,SelectModule,CommonModule, TabsModule,TableModule,DropdownModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  quyen!: any[];
  nhomQuyen!: any[];
  dsTenTK!:any[];
  tenNhomQuyen:string="";
  tenTaiKhoan:string="";
  constructor(public authService: AuthService,private route: ActivatedRoute,private apiService: APIService,private messageService: MessageService){}
  ngOnInit(): void {
    this.getAllNameAccount();
    this.quickSearchNhomQuyen();
    this.GetQuyenByTenNhomQuyen();
  }

  GetQuyenByTenNhomQuyen(tenNhomQuyen:string="") {
    const body = {
      TenNQ:tenNhomQuyen
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "GetQuyenByTenNhomQuyen", body).subscribe({
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

  quickSearchNhomQuyen(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "quickSearchNhomQuyen", body).subscribe({
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

  getAllNameAccount() {
    const body = {
    };
    this.apiService.callAPI(API_ENDPOINT.ACCOUNT_ENDPOINT.LOGIN + "getAllNameAccount", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
            this.dsTenTK = response.data.nameAccount;
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
  Save()
  {
    const body = {
      TenTaiKhoan:this.tenTaiKhoan,
      TenNhomQuyen:this.tenNhomQuyen
    };
    this.apiService.callAPI(API_ENDPOINT.NHOMQUYEN_ENDPOINT.NhomQuyen + "UpdateRole", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công',life:1000 })
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
 
  onNhomQuyenChange(event: any): void {
    const selectedNhanVien = this.tenNhomQuyen;
    this.GetQuyenByTenNhomQuyen(selectedNhanVien);
  }
}
