import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderAddComponent } from './purchase-order-request-add.component';

describe('PurchaseOrderAddComponent', () => {
  let component: PurchaseOrderAddComponent;
  let fixture: ComponentFixture<PurchaseOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
