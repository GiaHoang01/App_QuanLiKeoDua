import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteCancelComponent } from './shipping-note-cancel.component';

describe('ShippingNoteCancelComponent', () => {
  let component: ShippingNoteCancelComponent;
  let fixture: ComponentFixture<ShippingNoteCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
