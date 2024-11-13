import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarSinvUnidadComponent } from './aprobar-sinv-unidad.component';

describe('AprobarSinvUnidadComponent', () => {
  let component: AprobarSinvUnidadComponent;
  let fixture: ComponentFixture<AprobarSinvUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarSinvUnidadComponent]
    });
    fixture = TestBed.createComponent(AprobarSinvUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
