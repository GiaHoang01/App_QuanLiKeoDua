import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, InputGroupComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { API_ENDPOINT } from '../../../../environments/environments';
import { APIService } from '../../../../scss/services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
        CardComponent, CardBodyComponent, FormsModule, RouterOutlet, RouterLink, InputGroupComponent, CommonModule
    ]
})
export class LoginComponent {
    nameAccount: string = '';
    passWordAccount: string = '';
    isCheckAccount: boolean = false;
    errorMessage = {
      NameAccount: '',
      PassWordAccountss: '',
      NotExist:''
  };

    constructor( private router: Router,private apiService:APIService) {}

    login() {
      let hasError = false;
  
      if (!this.nameAccount) {
          this.errorMessage.NameAccount = 'Please enter your username';
          hasError = true; 
      } else {
          this.errorMessage.NameAccount = '';
      }
  
      if (!this.passWordAccount) {
          this.errorMessage.PassWordAccountss = 'Please enter your password';
          hasError = true;
      } else {
          this.errorMessage.PassWordAccountss = '';
      }

      if (hasError) {
          return;
      }
  
      this.errorMessage.NotExist = '';
      this.getData();
  }
  
  
    getData() {
        const body = {
            tenTaiKhoan: this.nameAccount,
            matKhau: this.passWordAccount
        };
        this.apiService.callAPI(API_ENDPOINT.ACCOUNT_ENDPOINT.LOGIN+"IsCheckAccount", body).subscribe({
            next: (response: any) => {
              if (response.status == 1) {
                this.isCheckAccount=true;
                this.router.navigate(['/pages']);
              } else {
                this.isCheckAccount=false;
                this.errorMessage.NotExist = 'Account does not exist !';
              }
            },
            error: (error: any) => {
              console.log(error);
            },
            complete: () => {
             
            }
          });
    }
    
}
