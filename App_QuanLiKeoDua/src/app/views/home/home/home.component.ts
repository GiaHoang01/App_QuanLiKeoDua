import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { API_ENDPOINT } from '../../../../environments/environments';
import { APIService } from '../../../../scss/services/api.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    ChartModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent
  ]
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  totalPurchase: number = 0;
  totalSale: number = 0;
  totalThu: number = 0;
  totalThuFormatted: string = '';
  totalChi: number = 0;
  totalChiFormatted: string = '';
  years = [2023, 2024, 2025];
  thuData!: any[];
  chiData!: any[];
  constructor( private apiService: APIService, private titleService: Title,  private route: ActivatedRoute) { }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
  ngOnInit() {
    const title = this.route.snapshot.data['title'];
    this.titleService.setTitle(title);
    this.thuData = [];
    this.chiData = [];
    this.GetTotalCompletedOrders();
    this.GetTotalCompletedSales();
    this.getTotalExpenses();
    this.getTotalRevenue();
    this.getDataAndInitChart();
  }

  getDataAndInitChart() {
    const years = this.years;

    Promise.all([
      this.getTotalExpensesByYear(years),
      this.getTotalRevenueByYear(years),
    ]).then(() => {
      if (this.thuData.length === years.length && this.chiData.length === years.length) {
        this.initChart();
      } else {
        console.error('Data is incomplete:', { thuData: this.thuData, chiData: this.chiData });
      }
    }).catch((error) => {
      console.error('Error fetching data for chart:', error);
    });
  }


  initChart() {
    if (isPlatformBrowser(this.platformId)) {

      const profitData = this.thuData.map((thu, index) => thu - this.chiData[index]);
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: ['Năm 2023', 'Năm 2024', 'Năm 2025'],
        datasets: [
          {
            type: 'bar',
            label: 'Thu (Revenue)',
            backgroundColor: '#00FFFF',
            data: this.thuData,
            borderColor: 'white',
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            type: 'bar',
            label: 'Chi (Expenses)',
            backgroundColor: '#0000FF',
            data: this.chiData,
            borderColor: 'white',
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            type: 'line',
            label: 'Lợi nhuận (Profit)',
            borderColor: '#FFEB3B',
            borderWidth: 5,
            fill: false,
            data: profitData,
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }


  //#region call api 
  getTotalRevenueByYear(years: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let pendingRequests = years.length;
      this.thuData = Array(years.length).fill(0); // Khởi tạo mảng với giá trị mặc định là 0
      years.forEach((year, index) => {
        const body = { Year: year };
        this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "getTotalRevenueByYear", body).subscribe({
          next: (response: any) => {
            if (response.status === 1) {
              this.thuData[index] = response.data.total; // Lưu dữ liệu vào vị trí tương ứng
            }
          },
          error: (error) => {
            console.error(error);
            this.thuData[index] = 0; // Nếu lỗi, đặt giá trị mặc định là 0
          },
          complete: () => {
            pendingRequests--;
            if (pendingRequests === 0) resolve(); // Khi tất cả request hoàn thành
          }
        });
      });
    });
  }


  getTotalExpensesByYear(years: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let pendingRequests = years.length;
      this.chiData = Array(years.length).fill(0); // Khởi tạo mảng với giá trị mặc định là 0
      years.forEach((year, index) => {
        const body = { Year: year };
        this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "getTotalExpensesByYear", body).subscribe({
          next: (response: any) => {
            if (response.status === 1) {
              this.chiData[index] = response.data.total; // Lưu dữ liệu vào vị trí tương ứng
            }
          },
          error: (error) => {
            console.error(error);
            this.chiData[index] = 0; // Nếu lỗi, đặt giá trị mặc định là 0
          },
          complete: () => {
            pendingRequests--;
            if (pendingRequests === 0) resolve(); // Khi tất cả request hoàn thành
          }
        });
      });
    });
  }

  GetTotalCompletedOrders() {
    const body = {

    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "GetTotalCompletedOrders", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.totalPurchase = response.data.totalPurchase;
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  GetTotalCompletedSales() {
    const body = {

    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "GetTotalCompletedSales", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.totalSale = response.data.totalSales;
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getTotalRevenue() {
    const body = {

    };
    this.apiService.callAPI(API_ENDPOINT.ORDER_ENDPOINT.SALEINVOICE_ORDER + "getTotalRevenue", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.totalThu = response.data.total;
          this.totalThuFormatted = this.formatCurrency(this.totalThu);
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getTotalExpenses() {
    const body = {

    };
    this.apiService.callAPI(API_ENDPOINT.PURCHASE_ENDPOINT.PURCHASE_ORDER + "getTotalExpenses", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.totalChi = response.data.total;
          this.totalChiFormatted = this.formatCurrency(this.totalChi);
        } else {

        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  //#endregion
}
