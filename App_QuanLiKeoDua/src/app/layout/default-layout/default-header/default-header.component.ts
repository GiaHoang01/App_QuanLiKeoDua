import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../../scss/services/Auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle,
  ],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'bi bi-lightbulb' },
    { name: 'dark', text: 'Dark', icon: 'bi bi-lightbulb-fill' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' },
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find((mode) => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  title: string = ''; // Biến title để lưu tiêu đề trang

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    // Lắng nghe NavigationEnd để cập nhật title khi điều hướng
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  /**
   * Phương thức cập nhật title dựa trên cấu trúc route con
   */
  private updateTitle(): void {
    let currentRoute = this.route.snapshot;
    let title = '';

    // Duyệt qua toàn bộ route con để lấy data['title']
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      if (currentRoute.data && currentRoute.data['title']) {
        title = currentRoute.data['title']; // Lấy title từ route con
      }
    }

    this.title = title || 'Home'; // Nếu không có title, mặc định là 'Home'
    this.cdRef.detectChanges(); // Cập nhật giao diện
  }

  /**
   * Phương thức đăng xuất
   */
  LogOut(): void {
    this.authService.clearTenDangNhap();
    this.router.navigate(['/login']);
  }

  sidebarId = input('');
}
