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
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

interface DataResult {
  promotion:any,
  promotionDetail: any[],
  employees:[],
  customers:[],
  products:[]
}

interface Filters{
  tenKhuyenMai:any,
  tenNV:any
}
@Component({
  selector: 'app-promotion-detail',
  standalone: true,
  imports: [ SidebarModule,ToastModule,Ripple,
    NgScrollbarModule,RouterModule,CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective,TableModule,AppQuickSearchComponent],
  providers: [MessageService],
  templateUrl: './promotion-detail.component.html',
  styleUrl: './promotion-detail.component.scss'
})
export class PromotionDetailComponent {
  id: string | null = null;
  status:number=0;
  constructor(private route: ActivatedRoute,private router: Router,private messageService: MessageService,
  protected utilsService: UtilsService,private apiService: APIService,
   protected globalService: GlobalService) { }
  data: DataResult = {
    promotion:{},
    promotionDetail: [],
    customers:[],
    employees:[],
    products:[]
  }

  filter:Filters={
    tenKhuyenMai:"",
    tenNV:"",
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.status = params['status'];
    });
    this.quickSearchHangHoa();
    this.getData();
  }
  getData() {
    const body = {
      MaKhuyenMai:this.id,
      Status:this.status
    };
  this.globalService.OnLoadpage();
    this.apiService.callAPI(API_ENDPOINT.PROMOTION_ENDPOINT.PROMOTION + "getPromotion_ByID", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.promotion = response.data.promotion;
          this.data.promotionDetail=response.data.promotionDetail;
          this.data.promotionDetail.forEach((item, index) => {
            this.initEdit(item, index);
          });
        } else {

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
  save() {
    if (!this.validateDates()) {
      return;
    }
    const body = {
      ChuongTrinhKhuyenMai:this.data.promotion,
      ChiTietKhuyenMai:this.data.promotionDetail,
      Status:2
    };
    this.apiService.callAPI(API_ENDPOINT.PROMOTION_ENDPOINT.PROMOTION + "SavePromotion", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lưu thành công',life:1000 });
        } else {
          this.messageService.add({severity: 'error',summary: 'Lỗi',detail: 'Lưu thất bại',life: 1000});
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

  getTenHangHoa_withByMaHangHoa(maHangHoa: string, callback: (tenHangHoa: string) => void) {
    const body = {
      MaHangHoa: maHangHoa,
    };
  
    this.apiService
      .callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getTenHangHoa_withByMaHangHoa", body)
      .subscribe({
        next: (response: any) => {
          if (response.status === 1) {
            callback(response.data.tenHangHoa);
          } else {
            console.log("Không lấy được tên hàng hóa");
          }
        },
        error: (error: any) => {
          console.error("Lỗi khi gọi API: ", error);
        },
      });
  }
  getGiaBan_withByMaHangHoa(maHangHoa: string, callback: (giaBan: number) => void) {
    const body = {
      MaHangHoa: maHangHoa,
    };
  
    this.apiService
      .callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getGiaBan_withByMaHangHoa", body)
      .subscribe({
        next: (response: any) => {
          if (response.status === 1) {
            callback(response.data.giaBan);
          } else {
            
          }
        },
        error: (error: any) => {
          console.error("Lỗi khi gọi API: ", error);
        },
      });
  }

  onAddRow() {
    let tempItem = {
     maHangHoa:"",
     tenHangHoa:"",
     donGia:0,
     giaSauKM:0,
     tiLeKhuyenMai:0,
     ngayBD:this.utilsService.DateAdd(new Date(),0),
     ngayKT:this.utilsService.DateAdd(new Date(),1),
    };
    this.data.promotionDetail.push(tempItem);
  }

  editableRowIndex: number | null = null;
  deleteRow(index: number): void {
    this.data.promotionDetail.splice(index, 1);
    if (this.editableRowIndex === index) {
      this.editableRowIndex = null;
    }
  }

  onSelectItem(itemSelected: any, item: any) {
    this.data.promotionDetail[item].maHangHoa = itemSelected.maHangHoa;
    this.data.promotionDetail[item].tenHangHoa = itemSelected.tenHangHoa;
    this.data.promotionDetail[item].giaBan = itemSelected.giaBan;
    this.data.promotionDetail[item].tiLeKhuyenMai=0;
    this.data.promotionDetail[item].giaSauKM = itemSelected.giaBan-itemSelected.giaBan*(this.data.promotionDetail[item].tiLeKhuyenMai);
    this.data.promotionDetail[item].ngayBD=this.utilsService.DateAdd(itemSelected.ngayBD,1);
    this.data.promotionDetail[item].ngayKT=this.utilsService.DateAdd(itemSelected.ngayBD,2);
  }

  
  initEdit(itemSelected: any, index: number) {
    this.data.promotionDetail[index].maHangHoa = itemSelected.maHangHoa;
  
    this.getTenHangHoa_withByMaHangHoa(itemSelected.maHangHoa, (tenHangHoa: string) => {
      this.data.promotionDetail[index].tenHangHoa = tenHangHoa;
    });
    this.getGiaBan_withByMaHangHoa(itemSelected.maHangHoa, (giaBan:number)=> {
      this.data.promotionDetail[index].giaBan=giaBan;
      this.data.promotionDetail[index].giaSauKM= giaBan - giaBan*this.data.promotionDetail[index].tiLeKhuyenMai;
    })
    
  }
  
  addNew()
  {
    this.router.navigate(['/promotion/promotionAdd'], {
      queryParams: { id: '', status: 1 },
    });
    this.id = null;
    this.status = 1; 
    this.data.promotion = {};
    this.data.promotionDetail = [];
    this.filter = { tenKhuyenMai: '', tenNV: '' };
    this.quickSearchHangHoa();
    this.getData();
    
  }
  validateDates(): boolean {
    for (let i = 0; i < this.data.promotionDetail.length; i++) {
      const item = this.data.promotionDetail[i];
      if (new Date(item.ngayKT) <= new Date(item.ngayBD)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: `Dòng ${i + 1}: Ngày kết thúc không được nhỏ hơn ngày bắt đầu`,
          life: 3000
        });
        return false; 
      }
      if(item.tiLeKhuyenMai>1 || item.tiLeKhuyenMai<0)
      {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: `Dòng ${i + 1}: Tỉ lệ khuyến mãi không được nhỏ hơn 0 và lớn hơn 1`,
          life: 3000
        });
        return false; 
      }
    }
    return true; 
  }
  calculateKhuyenMai(item: any): void {
    item.giaSauKM = item.giaBan-item.tiLeKhuyenMai * item.giaBan;
  }
}
