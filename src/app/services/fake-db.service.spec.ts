import { TestBed } from '@angular/core/testing';

import { FakeDbService } from './fake-db.service';

describe('FakeDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeDbService = TestBed.get(FakeDbService);
    expect(service).toBeTruthy();
  });
});
