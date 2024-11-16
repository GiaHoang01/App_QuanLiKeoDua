import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import { ColorModeService } from '@coreui/angular';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'App Quản lí kẹo dừa';

  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #titleService = inject(Title);
  readonly #colorModeService = inject(ColorModeService);

  constructor() {
    // Removed title setting from constructor
    this.#colorModeService.localStorageItemName.set('App Quản lí kẹo dừa');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    // Set the title in ngOnInit
    this.#titleService.setTitle(this.title);

    // Subscribe to query params for theme changes
    this.#activatedRoute.queryParams.pipe(
      delay(1),
      map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
      filter(theme => ['dark', 'light', 'auto'].includes(theme)),
      tap(theme => {
        this.#colorModeService.colorMode.set(theme);
      })
    ).subscribe();
  }
}
