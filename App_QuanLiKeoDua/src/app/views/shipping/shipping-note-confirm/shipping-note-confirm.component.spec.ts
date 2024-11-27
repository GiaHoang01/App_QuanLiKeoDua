import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteConfirmComponent } from './shipping-note-confirm.component';

describe('ShippingNoteConfirmComponent', () => {
  let component: ShippingNoteConfirmComponent;
  let fixture: ComponentFixture<ShippingNoteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
