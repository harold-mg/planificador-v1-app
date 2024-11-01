import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteConVehiculoComponent } from './reporte-con-vehiculo.component';

describe('ReportesConVehiculoComponent', () => {
  let component: ReporteConVehiculoComponent;
  let fixture: ComponentFixture<ReporteConVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteConVehiculoComponent]
    });
    fixture = TestBed.createComponent(ReporteConVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
