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
    if (this.authService.hasPermission(requiredPermission)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
