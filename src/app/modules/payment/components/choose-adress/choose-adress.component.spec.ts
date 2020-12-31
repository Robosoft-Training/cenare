import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAdressComponent } from './choose-adress.component';

describe('ChooseAdressComponent', () => {
  let component: ChooseAdressComponent;
  let fixture: ComponentFixture<ChooseAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
