import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarVirtUnidadComponent } from './aprobar-virt-unidad.component';

describe('AprobarVirtUnidadComponent', () => {
  let component: AprobarVirtUnidadComponent;
  let fixture: ComponentFixture<AprobarVirtUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarVirtUnidadComponent]
    });
    fixture = TestBed.createComponent(AprobarVirtUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
