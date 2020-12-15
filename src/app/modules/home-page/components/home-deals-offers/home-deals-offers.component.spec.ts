import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDealsOffersComponent } from './home-deals-offers.component';

describe('HomeDealsOffersComponent', () => {
  let component: HomeDealsOffersComponent;
  let fixture: ComponentFixture<HomeDealsOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDealsOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDealsOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
