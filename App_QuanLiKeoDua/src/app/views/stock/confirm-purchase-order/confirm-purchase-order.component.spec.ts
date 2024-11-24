import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchaseOrderComponent } from './confirm-purchase-order.component';

describe('ConfirmPurchaseOrderComponent', () => {
  let component: ConfirmPurchaseOrderComponent;
  let fixture: ComponentFixture<ConfirmPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPurchaseOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
