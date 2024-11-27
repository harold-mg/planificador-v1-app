import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioSinVehiculoComponent } from './calendario-sin-vehiculo.component';

describe('CalendarioSinVehiculoComponent', () => {
  let component: CalendarioSinVehiculoComponent;
  let fixture: ComponentFixture<CalendarioSinVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioSinVehiculoComponent]
    });
    fixture = TestBed.createComponent(CalendarioSinVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
