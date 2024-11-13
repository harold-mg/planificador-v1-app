import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadSinVehiculoFormComponent } from './actividad-sin-vehiculo-form.component';

describe('ActividadSinVehiculoFormComponent', () => {
  let component: ActividadSinVehiculoFormComponent;
  let fixture: ComponentFixture<ActividadSinVehiculoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadSinVehiculoFormComponent]
    });
    fixture = TestBed.createComponent(ActividadSinVehiculoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
