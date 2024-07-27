import { TestBed } from '@angular/core/testing';

import { ShopAllService } from './ShopAllService';

describe('ShopAllService', () => {
  let service: ShopAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
