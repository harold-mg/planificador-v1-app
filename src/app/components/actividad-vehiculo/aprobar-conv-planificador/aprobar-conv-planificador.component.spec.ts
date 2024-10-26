import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarConvPlanificadorComponent } from './aprobar-conv-planificador.component';

describe('AprobarConvPlanificadorComponent', () => {
  let component: AprobarConvPlanificadorComponent;
  let fixture: ComponentFixture<AprobarConvPlanificadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarConvPlanificadorComponent]
    });
    fixture = TestBed.createComponent(AprobarConvPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
