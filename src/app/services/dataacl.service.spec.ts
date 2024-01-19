import { TestBed } from '@angular/core/testing';

import { DataaclService } from './dataacl.service';

describe('DataaclService', () => {
  let service: DataaclService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataaclService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
