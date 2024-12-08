import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, InputGroupComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { API_ENDPOINT } from '../../../../environments/environments';
import { APIService } from '../../../../scss/services/api.service';
import { AuthService } from '../../../../scss/services/Auth.service';

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
  isLoading: boolean = false;  // Loading state
  errorMessage = {
    NameAccount: '',
    PassWordAccountss: '',
    NotExist: ''
  };

  constructor(private router: Router, private apiService: APIService, private authService: AuthService) { }
//#region  hàm
  login() {
    let hasError = false;

    // Validate fields
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

    this.isLoading = true;  // Set loading state to true
    this.errorMessage.NotExist = '';
    this.getData();
  }

  tenDangNhap: string = '';

  getData() {
    const body = {
      UserName: this.nameAccount,
      PassWord: this.passWordAccount
    };
    this.apiService.callAPI(API_ENDPOINT.ACCOUNT_ENDPOINT.LOGIN + "Login", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.isCheckAccount = true;
          this.tenDangNhap = response.data.userName;
          this.authService.setTenDangNhap(this.tenDangNhap);
          this.getPermissions();
        } else {
          this.isCheckAccount = false;
          this.errorMessage.NotExist = 'Account does not exist!';
        }
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;  // Stop loading on error
      }
    });
  }

  getPermissions() {
    const body = {
      UserName:this.nameAccount
    };
    this.apiService.callAPI(API_ENDPOINT.ACCOUNT_ENDPOINT.LOGIN + "getPermission", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.authService.setPermissions(response.data.quyens);
          if (this.authService.getPermissions().length > 0) {
            this.router.navigate(['/home']);
          } else {
            console.log('No permissions available');
            this.isCheckAccount = false;
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
//#endregion 
}
