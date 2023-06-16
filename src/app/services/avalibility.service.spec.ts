import { TestBed } from '@angular/core/testing';

import { AvalibilityService } from './avalibility.service';

describe('AvalibilityService', () => {
  let service: AvalibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvalibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
