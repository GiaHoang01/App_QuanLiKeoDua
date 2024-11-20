import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DatePickerComponent } from '../../../../components/datepicker/datepicker.component';
import { FormatDateDirective } from '../../../../directive/date-format.directive';
import { APIService } from '../../../../../scss/services/api.service';
import { GlobalService } from '../../../../../scss/services/global.service';
import { UtilsService } from '../../../../../scss/services/untils.service';
import { TableModule } from 'primeng/table';
interface DataResult {
  purchase: [],
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
  }

  
}
