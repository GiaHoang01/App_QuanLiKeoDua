import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteConfirmAddComponent } from './shipping-note-confirm-add.component';

describe('ShippingNoteConfirmAddComponent', () => {
  let component: ShippingNoteConfirmAddComponent;
  let fixture: ComponentFixture<ShippingNoteConfirmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteConfirmAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteConfirmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
