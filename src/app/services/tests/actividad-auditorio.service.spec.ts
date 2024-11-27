import { TestBed } from '@angular/core/testing';

import { ActividadAuditorioService } from './actividad-auditorio.service';

describe('ActividadAuditorioService', () => {
  let service: ActividadAuditorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadAuditorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
