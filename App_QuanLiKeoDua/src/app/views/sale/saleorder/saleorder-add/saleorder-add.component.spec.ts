import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderAddComponent } from './saleorder-add.component';

describe('SaleorderAddComponent', () => {
  let component: SaleorderAddComponent;
  let fixture: ComponentFixture<SaleorderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleorderAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleorderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
