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
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { API_ENDPOINT } from '../../../../environments/environments';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { APIService } from '../../../../scss/services/api.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  providers: [MessageService],
  imports: [
    Ripple, ToastModule,
    FormsModule,
    DialogModule,
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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: APIService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle(): void {
    let currentRoute = this.route.snapshot;
    let title = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      if (currentRoute.data && currentRoute.data['title']) {
        title = currentRoute.data['title'];
      }
    }

    this.title = title || 'Trang chủ';
    this.cdRef.detectChanges();
  }

  /**
   * Phương thức đăng xuất
   */
  LogOut(): void {
    this.authService.clearTenDangNhap();
    this.router.navigate(['/login']);
  }

  sidebarId = input('');
  isDialog: boolean = false;
  user = {
    username: '',
    newPassword: '',
    confirmPassword: ''
  };
  ResetAccount() {
    this.user.username = this.authService.getTenDangNhap();
    this.isDialog = true;
  }

  save() {
    if (this.user.newPassword !== this.user.confirmPassword) {
      alert('Mật khẩu mới và nhập lại mật khẩu không khớp!');
      return;
    }

    const body = {
      UserName: this.user.username,
      PassWordNew: this.user.newPassword
    };
    this.apiService.callAPI(API_ENDPOINT.ACCOUNT_ENDPOINT.LOGIN + "resetPass", body).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Lưu thành công', life: 1000 });
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


  closeDialog() {
    this.isDialog = false;
  }
}
