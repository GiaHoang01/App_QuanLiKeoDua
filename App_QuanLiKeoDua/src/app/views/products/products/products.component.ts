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
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { AuthService } from '../../../../scss/services/Auth.service';

interface DataResult {
  product: any,
  productList: any[],
  priceList:any[],
  price:any,
  note:any,
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
  IsShowPopupPrice: boolean = false;
  IsUpdate: boolean = false;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ];
  loaiHangHoa = [
    { label: "Vui lòng chọn ", value: "" },
    { label: "Kẹo dừa truyền thống", value: "CAT001" },
    { label: "Kẹo dừa dẻo", value: "CAT002" },
    { label: "Kẹo dừa tổng hợp", value: "CAT003" },
    { label: "Bánh kẹo tổng hợp", value: "CAT004" },
  ];
  data: DataResult = {
    product: {},
    productList: [],
    priceList:[],
    price:0,
    note:'',
  }
  searchString: string = "";
  constructor(public authService: AuthService,private route: ActivatedRoute, protected utilsService: UtilsService,
    private apiService: APIService, protected globalService: GlobalService,) {
  }

  ngOnInit(): void {
    this.getData
  }
  showUpdate(row:any) {
    this.data.product=deepCopy(row);
    this.IsUpdate = true;
    this.IsShowPopupEdit = true;
  }

  showAdd() {
    this.data.product = {};
    this.IsUpdate=false;
    this.IsShowPopupEdit = true;
  }

  showPrice(maHangHoa:string)
  {
    this.getPrice(maHangHoa);
    this.IsShowPopupPrice=true
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
          this.data.price=this.data.product.giaBan
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
      MaHangHoa: maHangHoa,
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
  
  AddProduct(isClose: boolean) {
    const body = {
      HangHoa: this.data.product,
      GiaBan:this.data.price,
      GhiChu:this.data.note,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "AddProduct", body).subscribe({
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

  UpdateProduct(isClose: boolean) {
    const body = {
      HangHoa: this.data.product,
      GiaBan: this.data.product.giaBan,
      GhiChu:this.data.product.ghiChu,
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "UpdateProduct", body).subscribe({
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

  saveProduct(isClose: boolean) {
    if (isClose) {
      if (this.IsUpdate) {
        this.UpdateProduct(isClose);
      }
      else {
        this.AddProduct(isClose);
      }
    }
    else {
      if (this.IsUpdate) {
        this.UpdateProduct(isClose);
      }
      else {
        this.AddProduct(isClose);
      }
    }
  }
  getPrice(maHangHoa:string)
  {
    const body = {
      MaHangHoa:maHangHoa
    };
    this.apiService.callAPI(API_ENDPOINT.PRODUCT_ENDPOINT.PRODUCT + "getPriceHistoryProduct", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.data.priceList = response.data.priceList;
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
  closeDialog() {
    this.IsShowPopupEdit = false;
  }closeDialogPrice() {
    this.IsShowPopupPrice = false;
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
