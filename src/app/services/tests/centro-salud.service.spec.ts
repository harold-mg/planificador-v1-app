import { TestBed } from '@angular/core/testing';

import { CentroSaludService } from './centro-salud.service';

describe('CentroSaludService', () => {
  let service: CentroSaludService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroSaludService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
