import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarSinvPlanificadorComponent } from './aprobar-sinv-planificador.component';

describe('AprobarSinvPlanificadorComponent', () => {
  let component: AprobarSinvPlanificadorComponent;
  let fixture: ComponentFixture<AprobarSinvPlanificadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarSinvPlanificadorComponent]
    });
    fixture = TestBed.createComponent(AprobarSinvPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
