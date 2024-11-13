import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSinVehiculoComponent } from './reportes-sin-vehiculo.component';

describe('ReportesSinVehiculoComponent', () => {
  let component: ReportesSinVehiculoComponent;
  let fixture: ComponentFixture<ReportesSinVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesSinVehiculoComponent]
    });
    fixture = TestBed.createComponent(ReportesSinVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
