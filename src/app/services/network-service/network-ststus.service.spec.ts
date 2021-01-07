import { TestBed } from '@angular/core/testing';

import { NetworkStstusService } from './network-ststus.service';

describe('NetworkStstusService', () => {
  let service: NetworkStstusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkStstusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
