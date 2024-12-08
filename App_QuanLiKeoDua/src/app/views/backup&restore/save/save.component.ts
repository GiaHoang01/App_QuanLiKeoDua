import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { APIService } from '../../../../scss/services/api.service';
import { API_ENDPOINT } from '../../../../environments/environments';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../scss/services/Auth.service';
@Component({

  selector: 'app-save',
  standalone: true,
  imports: [ToastModule,Ripple,CommonModule],
  providers: [MessageService],
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class SaveComponent {
  uploadProgress: number | null = null; // Hiển thị tiến độ upload
  uploadSuccess: boolean = false; // Trạng thái phục hồi thành công
  selectedFile: File | null = null;
  selectedFileName:string="";
  link: string = "";
  constructor(public authService: AuthService,private http: HttpClient, private apiService: APIService,private messageService: MessageService) { }

  createBackup() {
    const body = {

    };
    this.apiService.callAPI(API_ENDPOINT.BACKUPRESTORE_ENDPOINT.BACKUPRESTORE + "CreateBackup", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.link = response.downloadLink;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sao lưu thành công',life:1000 });
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; 
    this.selectedFileName = this.selectedFile.name;
    }

  }

  restoreBackup(): void {
    const body = {
      BackupFile:this.selectedFileName
    };
      // Gọi API phục hồi dữ liệu
      this.apiService.callAPI(API_ENDPOINT.BACKUPRESTORE_ENDPOINT.BACKUPRESTORE + "RestoreBackup", body).subscribe({
        next: (response: any) => {
          if (response.status == 1) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Phục hồi thành công',life:1000 });
          } else {
            this.messageService.add({ severity: 'errol', summary: 'Thông báo', detail: 'Đang xử dụng',life:1000 });
          }
        },
        error: (error: any) => {
        
        },
        complete: () => {
        
        }
      });
    
  }
}