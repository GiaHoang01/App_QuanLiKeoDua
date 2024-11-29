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

  setPermissions(permissions: string[]) {
    this.userPermissions = permissions;
    console.log('Permissions set:', this.userPermissions); // Log danh sách quyền
  }

  // Kiểm tra quyền
  hasPermission(permission: string): boolean {
    const hasPermission = this.userPermissions.includes(permission);
    console.log(
      `Checking permission: ${permission} - ${hasPermission ? 'Allowed' : 'Denied'}`
    ); // Log quyền được kiểm tra và kết quả
    return hasPermission;
  }

  // Lấy danh sách quyền
  getPermissions(): string[] {
    console.log('Current user permissions:', this.userPermissions); // Log danh sách quyền hiện tại
    return this.userPermissions;
  }
}
