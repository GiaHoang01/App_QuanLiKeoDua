import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmsaleorderComponent } from './confirmsaleorder.component';

describe('ConfirmsaleorderComponent', () => {
  let component: ConfirmsaleorderComponent;
  let fixture: ComponentFixture<ConfirmsaleorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmsaleorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmsaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
