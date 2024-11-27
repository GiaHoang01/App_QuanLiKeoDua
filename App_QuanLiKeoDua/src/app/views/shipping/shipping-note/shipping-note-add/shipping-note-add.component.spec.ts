import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNoteAddComponent } from './shipping-note-add.component';

describe('ShippingNoteAddComponent', () => {
  let component: ShippingNoteAddComponent;
  let fixture: ComponentFixture<ShippingNoteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingNoteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingNoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
