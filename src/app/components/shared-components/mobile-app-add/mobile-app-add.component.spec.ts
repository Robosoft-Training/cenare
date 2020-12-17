import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppAddComponent } from './mobile-app-add.component';

describe('MobileAppAddComponent', () => {
  let component: MobileAppAddComponent;
  let fixture: ComponentFixture<MobileAppAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
