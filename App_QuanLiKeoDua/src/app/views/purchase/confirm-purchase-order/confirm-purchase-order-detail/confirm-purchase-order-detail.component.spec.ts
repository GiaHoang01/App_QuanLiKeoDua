import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchaseOrderDetailComponent } from './confirm-purchase-order-detail.component';

describe('ConfirmPurchaseOrderDetailComponent', () => {
  let component: ConfirmPurchaseOrderDetailComponent;
  let fixture: ComponentFixture<ConfirmPurchaseOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPurchaseOrderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPurchaseOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
