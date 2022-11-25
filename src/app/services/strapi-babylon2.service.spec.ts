import { TestBed } from '@angular/core/testing';

import { StrapiBabylon2Service } from './strapi-babylon2.service';

describe('StrapiBabylon2Service', () => {
  let service: StrapiBabylon2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrapiBabylon2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
