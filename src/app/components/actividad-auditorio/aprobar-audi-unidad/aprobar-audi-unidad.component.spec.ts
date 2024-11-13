import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarAudiUnidadComponent } from './aprobar-audi-unidad.component';

describe('AprobarAudiUnidadComponent', () => {
  let component: AprobarAudiUnidadComponent;
  let fixture: ComponentFixture<AprobarAudiUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarAudiUnidadComponent]
    });
    fixture = TestBed.createComponent(AprobarAudiUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
