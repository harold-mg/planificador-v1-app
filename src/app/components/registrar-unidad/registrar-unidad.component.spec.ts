import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUnidadComponent } from './registrar-unidad.component';

describe('RegistrarUnidadComponent', () => {
  let component: RegistrarUnidadComponent;
  let fixture: ComponentFixture<RegistrarUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarUnidadComponent]
    });
    fixture = TestBed.createComponent(RegistrarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
