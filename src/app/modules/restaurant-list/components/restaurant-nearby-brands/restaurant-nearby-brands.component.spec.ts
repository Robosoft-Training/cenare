import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantNearbyBrandsComponent } from './restaurant-nearby-brands.component';

describe('RestaurantNearbyBrandsComponent', () => {
  let component: RestaurantNearbyBrandsComponent;
  let fixture: ComponentFixture<RestaurantNearbyBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantNearbyBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantNearbyBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
