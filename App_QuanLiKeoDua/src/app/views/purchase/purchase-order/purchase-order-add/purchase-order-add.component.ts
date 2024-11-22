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
interface DataResult {
  purchase:any,
  purchaseOrderDetail: any[],
  employees:[],
  vendors:[],
  products:[]
}

interface Filters{
  tenNCC:any,
  tenNV:any
}

@Component({
  selector: 'app-purchase-order-add',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective,TableModule,AppQuickSearchComponent],
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.scss']
})

export class PurchaseOrderAddComponent implements OnInit {
  id: string | null = null;
  status:number=0;
  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,private apiService: APIService, protected globalService: GlobalService) { }
  data: DataResult = {
    purchase:{},
    purchaseOrderDetail: [],
    vendors:[],
    employees:[],
    products:[]
  }

  filter:Filters={
    tenNCC:"",
    tenNV:"",
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
      MaPhieuNhap:this.id,
      Status:this.status
    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "getPurchaseOrder_ByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
         if(this.status==2)
         {
          this.data.purchase = response.data.phieuNhap;
          this.data.purchaseOrderDetail=response.data.chiTietPhieuNhap;
          this.SearchTenNCC_ByMaNCC(response.data.phieuNhap.maNCC);
          this.GetEmployeeByID(response.data.phieuNhap.maNV);
         }
         else
         {
          this.data.purchase = response.data.phieuNhap;
          this.data.purchaseOrderDetail=response.data.chiTietPhieuNhap;
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

  save() {
    const body = {
      PurchaseOrder:this.data.purchase,
      PurchaseOrderDetail:this.data.purchaseOrderDetail,
      Status:this.status
    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "SavePurchaseOrder", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
        
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


  onAddRow() {
    let tempItem = {
     maHang:"",
     tenHang:"",
     soLuong:0,
     donGia:0,
     thanhTien:0
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
    this.data.purchaseOrderDetail[item].soLuongDat = 1;
    this.data.purchaseOrderDetail[item].donGia = 0;
    this.data.purchaseOrderDetail[item].thanhTien = 0;
  }
  
}
