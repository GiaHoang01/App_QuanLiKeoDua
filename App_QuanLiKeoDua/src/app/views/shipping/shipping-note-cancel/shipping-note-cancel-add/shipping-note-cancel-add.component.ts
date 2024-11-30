import { Component, OnInit  } from '@angular/core';
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
import { Toast, ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

interface DataResult {
  shippingNoteCancel: any;
  invoice: [],
}

interface Filters {
  maPhieuGiao: any,
}

@Component({
  selector: 'app-shipping-note-cancel-add',
  standalone: true,
  imports: [SidebarModule, ToastModule, Ripple,
    NgScrollbarModule, RouterModule, CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective, TableModule, AppQuickSearchComponent],
  templateUrl: './shipping-note-cancel-add.component.html',
  providers: [MessageService],
  styleUrl: './shipping-note-cancel-add.component.scss'
})
export class ShippingNoteCancelAddComponent implements OnInit{
  id: string | null = null;
  status: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService,
    protected utilsService: UtilsService, private apiService: APIService,
    protected globalService: GlobalService) { }

    data: DataResult = {
      shippingNoteCancel: {},
      invoice: [],
    }
    filter: Filters = {
      maPhieuGiao: "",
    }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        this.status = params['status'];
      });
      this.getData();
      this.quickSearchShippingNoteIncpmplete();
    }
  
    getHinhThuc(maHinhThuc: string): string {
      switch (maHinhThuc) {
        case 'CK': return 'Chuyển khoản';
        case 'COD': return 'Thanh toán khi nhận hàng';
        case 'TM': return 'Tiền mặt';
        default: return ''; // Trả về mã nếu không khớp
      }
    }
  
    quickSearchShippingNoteIncpmplete(searchString: string = '') {
      const body = {
        SearchString: searchString,
      };
      this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE + "quickSearchShippingNoteIncpmplete", body).subscribe({
        next: (response: any) => {
          if (response.status == 1) {
            this.data.invoice = response.data.hoaDonKhachHang;         
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
  
    onInvoiceSelected(invoice: any): void {
      if (invoice) {
        // Gán dữ liệu từ hóa đơn được chọn vào đối tượng shippingNote
        this.data.shippingNoteCancel = {
          ...this.data.shippingNoteCancel, // Giữ lại các giá trị hiện có
          maPhieuGiao: invoice.maPhieuGiao,
          ngayGiao: invoice.ngayGiao,
          maKhachHang: invoice.maKhachHang,
          tenKhachHang: invoice.tenKhachHang,
          sdt: invoice.sdt,
          maThongTin: invoice.maThongTin,
          sdtGiaoHang: invoice.sdtGiaoHang,
          diaChi: invoice.diaChi,
        };
      }
    }
    
    getData() {
      const body = {
          MaPhieuHuy: this.id,
          Status: this.status
      };
  
      this.globalService.OnLoadpage();
      this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE_CANCEL + "GetShippingNoteCancelByID", body).subscribe({
          next: (response: any) => {
              if (response.status == 1) {
                  this.data.shippingNoteCancel = response.data.phieuHuyDon;
                  console.log("shipping-note sau khi gán:", this.data.shippingNoteCancel);
                  //this.filter.maPhieuHuy = response.data.phieuHuyDon.maPhieuHuy;
                if(this.status == 2)
                {
                  this.filter.maPhieuGiao = this.data.shippingNoteCancel.maPhieuGiao;
                }
                  
                  console.log("Mã phiếu hủy nèe: ", response.data.phieuHuyDon.maPhieuHuy);
                  
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
  
  saveShippingNoteCancel()
  {
    const body = {
      PhieuHuyDon: this.data.shippingNoteCancel,
    };
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE_CANCEL + "SaveShippingNoteCancel", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          //this.id = response.data.maThongTin;
          //this.status = response.data.status;
          console.log('id', this.id);
          console.log('status', this.status);
          console.log("Lưu thành công!");
        } else {
          console.log("Lưu thất bại");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.getData();
        this.globalService.OffLoadpage();
      }
    });
  }
    // confirmShippingNote(trangThai: number)
    // {
    //   const body = {
    //     MaPhieuGiao: this.id,
    //     MaNhanVien: this.maNhanVien,
    //     TrangThai: trangThai,
    //   };
    //   this.globalService.OnLoadpage();
    //   this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE + "ChangeShippingNoteStatus", body).subscribe({
    //     next: (response: any) => {
    //       if (response.status == 1) {
    //         //this.id = response.data.maThongTin;
    //         //this.status = response.data.status;
    //         console.log('id', this.id);
    //         console.log('status', this.status);
    //         console.log("Lưu thành công!");
    //       } else {
    //         console.log("Lưu thất bại");
    //       }
    //     },
    //     error: (error: any) => {
    //       console.log(error);
    //     },
    //     complete: () => {
    //       this.getData();
    //       this.globalService.OffLoadpage();
    //     }
    //   });
    // }
}
