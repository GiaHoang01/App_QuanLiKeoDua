import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute , Router} from '@angular/router';

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

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'bi bi-lightbulb' },
    { name: 'dark', text: 'Dark', icon: 'bi bi-lightbulb-fill' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  title: string=""; // Thêm biến title để lưu tên trang

  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.route.firstChild?.data.subscribe(data => {
        this.title = data['title'] || 'Home';
      });
    });
  }

  LogOut()
  {
    this.authService.clearTenDangNhap();
    this.router.navigate(['/login']);
  }
  sidebarId = input('');
}
