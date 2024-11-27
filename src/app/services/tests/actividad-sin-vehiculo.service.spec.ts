import { TestBed } from '@angular/core/testing';

import { ActividadSinVehiculoService } from './actividad-sin-vehiculo.service';

describe('ActividadSinVehiculoService', () => {
  let service: ActividadSinVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadSinVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
