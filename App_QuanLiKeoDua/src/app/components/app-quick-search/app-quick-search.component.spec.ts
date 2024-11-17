import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuickSearchComponent } from './app-quick-search.component';

describe('AppQuickSearchComponent', () => {
  let component: AppQuickSearchComponent;
  let fixture: ComponentFixture<AppQuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppQuickSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
