import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarUnidadComponent } from './aprobar-conv-unidad.component';

describe('AprobarUnidadComponent', () => {
  let component: AprobarUnidadComponent;
  let fixture: ComponentFixture<AprobarUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarUnidadComponent]
    });
    fixture = TestBed.createComponent(AprobarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
