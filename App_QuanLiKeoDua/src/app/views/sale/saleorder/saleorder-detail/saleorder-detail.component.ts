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
  saleInvoice:any,
  saleInvoiceDetail: any[],
  employees:[],
  customers:[],
  products:[]
}

interface Filters{
  tenKH:any,
  tenNV:any
}
@Component({
  selector: 'app-saleorder-detail',
  standalone: true,
  imports: [ SidebarModule,ToastModule,Ripple,
    NgScrollbarModule,RouterModule,CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective,TableModule,AppQuickSearchComponent],
    providers: [MessageService],
  templateUrl: './saleorder-detail.component.html',
  styleUrl: './saleorder-detail.component.scss'
})
export class SaleorderDetailComponent {
  id: string | null = null;
  status:number=0;
  constructor(private route: ActivatedRoute,private router: Router,private messageService: MessageService,
  protected utilsService: UtilsService,private apiService: APIService,
   protected globalService: GlobalService) { }
  data: DataResult = {
    saleInvoice:{},
    saleInvoiceDetail: [],
    customers:[],
    employees:[],
    products:[]
  }

  filter:Filters={
    tenKH:"",
    tenNV:"",
  }
}
