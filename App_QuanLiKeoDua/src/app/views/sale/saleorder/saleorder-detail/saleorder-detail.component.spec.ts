import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderDetailComponent } from './saleorder-detail.component';

describe('SaleorderDetailComponent', () => {
  let component: SaleorderDetailComponent;
  let fixture: ComponentFixture<SaleorderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleorderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
