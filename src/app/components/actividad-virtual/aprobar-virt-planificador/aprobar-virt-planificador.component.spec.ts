import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarVirtPlanificadorComponent } from './aprobar-virt-planificador.component';

describe('AprobarVirtPlanificadorComponent', () => {
  let component: AprobarVirtPlanificadorComponent;
  let fixture: ComponentFixture<AprobarVirtPlanificadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarVirtPlanificadorComponent]
    });
    fixture = TestBed.createComponent(AprobarVirtPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
