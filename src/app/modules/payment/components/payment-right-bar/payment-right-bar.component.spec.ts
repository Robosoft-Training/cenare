import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRightBarComponent } from './payment-right-bar.component';

describe('PaymentRightBarComponent', () => {
  let component: PaymentRightBarComponent;
  let fixture: ComponentFixture<PaymentRightBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRightBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRightBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
