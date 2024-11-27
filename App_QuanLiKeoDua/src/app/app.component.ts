import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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

  constructor(private cd: ChangeDetectorRef,private router: Router, private titleService: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Đảm bảo tiêu đề được cập nhật khi điều hướng
      const title = this.router.routerState.snapshot.root.firstChild?.data['title'] || 'Default Title';
      this.titleService.setTitle(title);
    });
    // Set color mode related settings
    this.#colorModeService.localStorageItemName.set('App Quản lí kẹo dừa');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    // Chỉ đăng ký một lần
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => { 
      this.updateTitle();
      this.cd.detectChanges();
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
  
  private updateTitle() {
    let route = this.#router.routerState.snapshot.root;
    let title = 'Default Title';  // Default title
    
    console.log('Current Route:', route);  // Debug log to see route
    
    // Loop through child routes to find the title
    while (route.firstChild) {
      route = route.firstChild;  // Move to the first child route
      if (route.data && route.data['title']) {
        title = route.data['title'];  // Set the title from route data
      }
    }
  
    // Log the final title
    console.log('Updated Title:', title);
  
    // Set the page title
    this.#titleService.setTitle(title);
  }
  
}
