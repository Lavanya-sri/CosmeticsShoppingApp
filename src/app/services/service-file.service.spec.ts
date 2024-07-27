import { TestBed } from '@angular/core/testing';

import { ServiceFileService } from './service-file.service';

describe('ServiceFileService', () => {
  let service: ServiceFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
