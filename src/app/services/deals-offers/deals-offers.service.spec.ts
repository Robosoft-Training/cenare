import { TestBed } from '@angular/core/testing';

import { DealsOffersService } from './deals-offers.service';

describe('DealsOffersService', () => {
  let service: DealsOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
