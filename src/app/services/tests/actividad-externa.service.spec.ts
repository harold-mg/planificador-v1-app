import { TestBed } from '@angular/core/testing';

import { ActividadExternaService } from './actividad-externa.service';

describe('ActividadExternaService', () => {
  let service: ActividadExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
