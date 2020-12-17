import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListFilterComponent } from './restaurant-list-filter.component';

describe('RestaurantListFilterComponent', () => {
  let component: RestaurantListFilterComponent;
  let fixture: ComponentFixture<RestaurantListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
