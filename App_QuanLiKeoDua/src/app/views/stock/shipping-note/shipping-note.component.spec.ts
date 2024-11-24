import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteComponent } from './shipping-note.component';

describe('ShippingNoteComponent', () => {
  let component: ShippingNoteComponent;
  let fixture: ComponentFixture<ShippingNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
