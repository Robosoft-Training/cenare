import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListOptionsComponent } from './restaurant-list-options.component';

describe('RestaurantListOptionsComponent', () => {
  let component: RestaurantListOptionsComponent;
  let fixture: ComponentFixture<RestaurantListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
