import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderComponent } from './saleorder.component';

describe('SaleorderComponent', () => {
  let component: SaleorderComponent;
  let fixture: ComponentFixture<SaleorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
