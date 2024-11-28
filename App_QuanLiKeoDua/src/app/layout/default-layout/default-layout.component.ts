import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { AuthService } from '../../../scss/services/Auth.service';
import { INavData } from '@coreui/angular';
import { PermissionGuard } from '../../../scss/services/guard.service';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = navItems;
  scrollbar: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.filterMenuItems();  // Filter menu items based on permissions
  }

  // Filter menu items based on permission
  filterMenuItems() {
    this.navItems = this.navItems
      .map(item => {
        if (item.children && Array.isArray(item.children)) {
          item.children = this.filterChildren(item.children);  // Filter child items based on permission
        }
        // Return item if it has valid children or no children
        return item.children && item.children.length > 0 ? item : null;
      })
      .filter(item => item !== null);  // Remove invalid items
  }

  // Recursively filter child menu items
  filterChildren(children: INavData[]): INavData[] {
    return children
      .map(child => {
        if (child.children && Array.isArray(child.children)) {
          child.children = this.filterChildren(child.children);  // Filter deeper child items
        }
        // Check permission before keeping child item
        return child.permission && this.authService.hasPermission(child.permission) ? child : null;
      })
      .filter(child => child !== null);  // Remove invalid child items
  }

  onScrollbarUpdate() {
    const scrollbarState = this.scrollbar.scrollbar.getState();
  }
}
