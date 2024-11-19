import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, tap } from 'rxjs/operators';
import { ColorModeService } from '@coreui/angular';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'App Quản lí kẹo dừa';

  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);
  readonly #colorModeService = inject(ColorModeService);

  constructor() {
    // Set color mode related settings
    this.#colorModeService.localStorageItemName.set('App Quản lí kẹo dừa');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    // Subscribe to router events to update title dynamically
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });

     // Subscribe to query params for theme changes
     this.#activatedRoute.queryParams.pipe(
      filter(params => params['theme']), // Filter if theme query param exists
      tap(params => {
        const theme = params['theme']; // Get theme directly from params
        if (['dark', 'light', 'auto'].includes(theme)) {
          this.#colorModeService.colorMode.set(theme);
        }
      })
    ).subscribe();
  }

  // Method to update the title based on the current route
  private updateTitle() {
    let route = this.#router.routerState.snapshot.root;
    let title = 'Default Title';  // Tiêu đề mặc định
  
    // Kiểm tra các route con và lấy title từ data
    while (route.firstChild) {
      route = route.firstChild;  // Di chuyển đến route con
      if (route.data && route.data['title']) {
        title = route.data['title'];  // Cập nhật title từ route con
      }
    }
  
    // Cập nhật title cho trang
    this.#titleService.setTitle(title);
  }
  
}
