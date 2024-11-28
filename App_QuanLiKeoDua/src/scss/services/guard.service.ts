import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const requiredPermission = route.data['requiredPermission'];
    console.log('Required permission for route:', requiredPermission); // Log quyền yêu cầu
    const hasPermission = this.authService.hasPermission(requiredPermission);

    if (hasPermission) {
      console.log(`Access granted to route with permission: ${requiredPermission}`);
      return true;
    }

    console.warn(
      `Access denied to route. Missing permission: ${requiredPermission}`
    );
    this.router.navigate(['/login']); // Điều hướng về login nếu không đủ quyền
    return false;
  }
}
