import { TestBed } from '@angular/core/testing';

import { DatosExcelService } from './datos-excel.service';

describe('DatosExcelService', () => {
  let service: DatosExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
