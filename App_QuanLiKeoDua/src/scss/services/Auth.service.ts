// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tenDangNhap: string | null = null;

  // Lưu tên đăng nhập
  setTenDangNhap(username: string) {
    this.tenDangNhap = username;
    localStorage.setItem('tenDangNhap', username); // Lưu vào localStorage
  }

  // Lấy tên đăng nhập
  getTenDangNhap(): string | null {
    if (!this.tenDangNhap) {
      this.tenDangNhap = localStorage.getItem('tenDangNhap'); // Lấy từ localStorage
    }
    return this.tenDangNhap;
  }

  // Xóa thông tin đăng nhập
  clearTenDangNhap() {
    this.tenDangNhap = null;
    localStorage.removeItem('tenDangNhap'); // Xóa khỏi localStorage
  }
}
