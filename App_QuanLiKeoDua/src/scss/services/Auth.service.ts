// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tenDangNhap: string | null = null;
  private userPermissions: string[] = [];
  apiService: any;
  constructor(private http: HttpClient) {}
  // Lưu tên đăng nhập
  setTenDangNhap(username: string) {
    this.tenDangNhap = username;
    localStorage.setItem('tenDangNhap', username);
  }

  // Lấy tên đăng nhập
  getTenDangNhap(): string | null {
    if (!this.tenDangNhap) {
      this.tenDangNhap = localStorage.getItem('tenDangNhap');
    }
    return this.tenDangNhap;
  }

  // Xóa thông tin đăng nhập
  clearTenDangNhap() {
    this.tenDangNhap = null;
    localStorage.removeItem('tenDangNhap');
  }

   // Lưu danh sách quyền vào bộ nhớ
   setPermissions(permissions: string[]) {
    this.userPermissions = permissions;
  }

  // Kiểm tra quyền
  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }

  // Lấy danh sách quyền (nếu cần hiển thị)
  getPermissions(): string[] {
    return this.userPermissions;
  }
}
