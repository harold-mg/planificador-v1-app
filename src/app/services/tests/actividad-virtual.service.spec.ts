import { TestBed } from '@angular/core/testing';

import { ActividadVirtualService } from './actividad-virtual.service';

describe('ActividadVirtualService', () => {
  let service: ActividadVirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadVirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
