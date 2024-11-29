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
import { SidebarModule } from 'primeng/sidebar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
//import { v4 as uuidv4 } from 'uuid'; 

interface DataResult {
  shippingNote: any;
  employees: [],
  invoice: [],
}

interface Filters {
  maHoaDon: any,
}

@Component({
  selector: 'app-shipping-note-add',
  standalone: true,
  imports: [SidebarModule, ToastModule, Ripple,
    NgScrollbarModule, RouterModule, CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective, TableModule, AppQuickSearchComponent],
  templateUrl: './shipping-note-add.component.html',
  providers: [MessageService],
  styleUrl: './shipping-note-add.component.scss'
})
export class ShippingNoteAddComponent implements OnInit {
  id: string | null = null;
  status: number = 0;
  selectedAddress: any = null; // Biến lưu địa chỉ được chọn

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService,
    protected utilsService: UtilsService, private apiService: APIService,
    protected globalService: GlobalService) { }
  data: DataResult = {
    shippingNote: {},
    employees: [],
    invoice: [],
  }
  filter: Filters = {
    maHoaDon: "",

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.status = params['status'];
    });
    this.getData();
    this.quickSearchHoaDonMoiTao();
    // const defaultAddress = this.data.shippingNote.thongTinGiaoHang.find((address: any) => address.macDinh === true);

    // if (defaultAddress) {
    //   this.selectedAddress = defaultAddress; // Gán địa chỉ mặc định vào selectedAddress
    // }
  }

  getHinhThuc(maHinhThuc: string): string {
    switch (maHinhThuc) {
      case 'CK': return 'Chuyển khoản';
      case 'COD': return 'Thanh toán khi nhận hàng';
      case 'TM': return 'Tiền mặt';
      default: return maHinhThuc; // Trả về mã nếu không khớp
    }
  }

  quickSearchHoaDonMoiTao(searchString: string = '') {
    const body = {
      SearchString: searchString,
    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "quickSearchSaleInvoiceNewCreated", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.invoice = response.data.hoaDonKhachHang;
          //console.log('---->', response.data.hoaDonKhachHang.thongTinGiaoHang);
          
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
      this.data.shippingNote = {
        ...this.data.shippingNote, // Giữ lại các giá trị hiện có
        maHoaDon: invoice.maHoaDon,
        tongTriGia: invoice.tongTriGia,
        ghiChu: invoice.ghiChu,
        ngayBan: invoice.ngayBan,
        maHinhThuc: invoice.maHinhThuc,
        maKhachHang: invoice.maKhachHang,
        tenKhachHang: invoice.tenKhachHang,
        sdt: invoice.sdt,
        thongTinGiaoHang: invoice.thongTinGiaoHang || [] // Gán danh sách địa chỉ giao hàng
      };
      this.selectedAddress = invoice.thongTinGiaoHang?.find((address: any) => address.macDinh === true) || null;
    }
  }

  getData() {
    const body = {
        MaPhieuGiao: this.id,
        Status: this.status
    };

    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE + "GetShippingNoteByID", body).subscribe({
        next: (response: any) => {
            if (response.status === 1) {
                this.data.shippingNote = response.data.phieuGiaoHang;
                this.filter.maHoaDon = response.data.phieuGiaoHang.maHoaDon;

                console.log("shipping-note:", this.data.shippingNote);

                // Nếu status = 2 và MaThongTinHienTai không null, chọn địa chỉ theo MaThongTinHienTai
                if (this.status == 2) {
                  const maThongTinHienTai = this.data.shippingNote.maThongTinHienTai;
                    this.selectedAddress = this.data.shippingNote.thongTinGiaoHang.find((address: any) =>
                        address.maThongTin === maThongTinHienTai
                    );
                    console.log("đây là selectedAddress nhé: ", this.selectedAddress);
                 }// else {
                //     // Nếu MaThongTinHienTai là null hoặc status khác 2, chọn địa chỉ mặc định (macDinh)
                //     // this.selectedAddress = this.data.shippingNote.thongTinGiaoHang.find((address: any) =>
                //     //     address.macDinh == true
                //     );
                // }

                console.log("selectedAddress:", this.selectedAddress);
                this.id = this.data.shippingNote.maHoaDon;
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

  saveShippingNote() {
    const body = {
      Status: this.status,
      PhieuGiaoHang: this.data.shippingNote,
      MaThongTin: this.selectedAddress.maThongTin ? this.selectedAddress.maThongTin : null  // Lấy MaThongTin từ địa chỉ đã chọn
    };
    console.log("save MaThongTin: ", this.selectedAddress.maThongTin);
    this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.SHIPPING_ENDPOINT.SHIPPING_NOTE + "SaveShippingNote", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.id = response.data.maThongTin;
          this.status = response.data.status;
          //this.status == 2;
          //this.getData();
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
  onAddressSelected(address: any): void {
    this.selectedAddress = address;  // Cập nhật selectedAddress khi người dùng chọn địa chỉ
    console.log("Địa chỉ đã được chọn lại nè: ", this.selectedAddress);
  }
}
