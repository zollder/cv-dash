import { TestBed } from '@angular/core/testing';

import { WorkloadDataService } from './workload-data.service';

describe('WorkloadDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkloadDataService = TestBed.get(WorkloadDataService);
    expect(service).toBeTruthy();
  });
});
