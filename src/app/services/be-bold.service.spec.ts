import { TestBed } from '@angular/core/testing';

import { BeBoldService } from './be-bold.service';

describe('BeBoldService', () => {
  let service: BeBoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeBoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
