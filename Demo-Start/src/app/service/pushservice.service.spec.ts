import { TestBed } from '@angular/core/testing';

import { PushserviceService } from './pushservice.service';

describe('PushserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushserviceService = TestBed.get(PushserviceService);
    expect(service).toBeTruthy();
  });
});
