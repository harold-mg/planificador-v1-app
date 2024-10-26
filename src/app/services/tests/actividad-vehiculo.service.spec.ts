import { TestBed } from '@angular/core/testing';

import { ActividadVehiculoService } from './actividad-vehiculo.service';

describe('ActividadVehiculoService', () => {
  let service: ActividadVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
