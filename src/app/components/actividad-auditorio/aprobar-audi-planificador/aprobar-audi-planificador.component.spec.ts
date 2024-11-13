import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarAudiPlanificadorComponent } from './aprobar-audi-planificador.component';

describe('AprobarAudiPlanificadorComponent', () => {
  let component: AprobarAudiPlanificadorComponent;
  let fixture: ComponentFixture<AprobarAudiPlanificadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarAudiPlanificadorComponent]
    });
    fixture = TestBed.createComponent(AprobarAudiPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
