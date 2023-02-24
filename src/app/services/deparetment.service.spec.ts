import { TestBed } from '@angular/core/testing';

import { DeparetmentService } from './deparetment.service';

describe('DeparetmentService', () => {
  let service: DeparetmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeparetmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
