import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    // Lấy quyền yêu cầu từ dữ liệu route
    const requiredPermission = route.data['requiredPermission'];
  
    // Kiểm tra nếu người dùng có quyền cần thiết
    const hasPermission = this.authService.hasPermission(requiredPermission);
  
    // Nếu người dùng có quyền hoặc đã đăng nhập, cho phép truy cập
    if (hasPermission) {
      return true;
    }
    
    // Nếu người dùng đã đăng nhập nhưng không có quyền, cho phép truy cập
    if (this.authService.getTenDangNhap()) {
      return true;
    }
  
    // Nếu không có quyền và không đăng nhập, chuyển hướng đến trang login
    this.router.navigate(['/login']);
    return false;
  }
  
}
