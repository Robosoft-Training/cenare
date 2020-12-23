import { TestBed } from '@angular/core/testing';

import { RestaurantOverviewService } from './restaurant-overview.service';

describe('RestaurantOverviewService', () => {
  let service: RestaurantOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
