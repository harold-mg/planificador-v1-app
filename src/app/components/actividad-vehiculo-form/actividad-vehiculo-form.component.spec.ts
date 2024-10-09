import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadVehiculoFormComponent } from './actividad-vehiculo-form.component';

describe('ActividadVehiculoFormComponent', () => {
  let component: ActividadVehiculoFormComponent;
  let fixture: ComponentFixture<ActividadVehiculoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadVehiculoFormComponent]
    });
    fixture = TestBed.createComponent(ActividadVehiculoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
