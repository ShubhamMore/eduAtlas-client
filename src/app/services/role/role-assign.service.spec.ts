import { TestBed } from '@angular/core/testing';

import { RoleAssignService } from './role-assign.service';

describe('RoleAssignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleAssignService = TestBed.get(RoleAssignService);
    expect(service).toBeTruthy();
  });
});
