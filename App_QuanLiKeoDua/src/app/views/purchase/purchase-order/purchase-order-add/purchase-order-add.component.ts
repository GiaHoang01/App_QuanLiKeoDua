import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
interface DataResult {
  purchase:any[],
  purchaseOrderDetail: any
}

@Component({
  selector: 'app-purchase-order-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DatePickerComponent, FormatDateDirective,TableModule],
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.scss']
})

export class PurchaseOrderAddComponent implements OnInit {
  id: string | null = null;
  products!: any[];
  constructor(private route: ActivatedRoute, protected utilsService: UtilsService,private apiService: APIService, protected globalService: GlobalService) { }
  data: DataResult = {
    purchase: [],
    purchaseOrderDetail: {}
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.data.purchase = [
      { id: '1000', code: 'MH01', name: 'Bamboo Watch 1', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
      { id: '1001', code: 'MH02', name: 'Bamboo Watch 2', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 23, inventoryStatus: 'INSTOCK', rating: 5 },
    ];
  }

  // getData() {
  //   const body = {
  //     SearchString: "",
  //     PageSize: this.globalService.paging.PageSize,
  //     PageIndex: this.globalService.paging.PageIndex,
  //   };
  //   this.apiService.callAPI(API_ENDPOINT.EMPLOYEES_ENDPOINT.EMPLOYEE + "getAllEmployees", body).subscribe({
  //     next: (response: any) => {
  //       if (response.status == 1) {
  //         this.globalService.paging.TotalRows = response.data.totalRows;
  //         this.data.purchase = response.data.employees;
  //       } else {

  //       }
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //     complete: () => {

  //     }
  //   });
  // }
}
