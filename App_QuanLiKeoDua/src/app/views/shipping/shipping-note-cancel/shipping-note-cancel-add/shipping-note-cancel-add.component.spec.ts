import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteCancelAddComponent } from './shipping-note-cancel-add.component';

describe('ShippingNoteCancelAddComponent', () => {
  let component: ShippingNoteCancelAddComponent;
  let fixture: ComponentFixture<ShippingNoteCancelAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteCancelAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteCancelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
