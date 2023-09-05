import { TestBed } from '@angular/core/testing';

import { DamageService } from './damage.service';

describe('DamageService', () => {
  let service: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
