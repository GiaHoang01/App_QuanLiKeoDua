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
  public navItems: INavData[] = navItems; // Original menu items
  scrollbar: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.filterMenuItems(); // Filter the navigation menu based on permissions
  }

  /**
   * Filters the top-level menu items based on permissions
   */
  filterMenuItems() {
    this.navItems = this.navItems
      .map(item => {
        // Check if the item has children
        if (item.children && Array.isArray(item.children)) {
          // Recursively filter child items
          const filteredChildren = this.filterChildren(item.children);

          // Keep the parent item if it has valid children
          if (filteredChildren.length > 0) {
            item.children = filteredChildren;
            return item;
          }
          return null; // Remove parent if no valid children exist
        }

        // Check permission for top-level item
        const hasPermission = !item.permission || this.authService.hasPermission(item.permission);
        return hasPermission ? item : null; // Keep if permission exists or none required
      })
      .filter(item => item !== null); // Remove null entries
  }

  /**
   * Recursively filters child menu items based on permissions
   * @param children Child menu items to filter
   * @returns Filtered child menu items
   */
  filterChildren(children: INavData[]): INavData[] {
    return children
      .map(child => {
        // Recursively filter grandchildren, if any
        if (child.children && Array.isArray(child.children)) {
          const filteredGrandchildren = this.filterChildren(child.children);
          if (filteredGrandchildren.length > 0) {
            child.children = filteredGrandchildren;
            return child;
          }
          return null; // Remove child if no valid grandchildren
        }

        // Check permission for child item
        const hasPermission = !child.permission || this.authService.hasPermission(child.permission);
        return hasPermission ? child : null; // Keep if permission exists or none required
      })
      .filter(child => child !== null); // Remove null entries
  }

  /**
   * Placeholder for scrollbar update functionality (if needed)
   */
  onScrollbarUpdate() {
    const scrollbarState = this.scrollbar?.scrollbar.getState();
  }
}
