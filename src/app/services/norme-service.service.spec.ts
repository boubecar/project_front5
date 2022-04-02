import { TestBed } from '@angular/core/testing';

import { NormeServiceService } from './norme-service.service';

describe('NormeServiceService', () => {
  let service: NormeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
