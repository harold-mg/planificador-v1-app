import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirInicioComponent } from './subir-inicio.component';

describe('SubirInicioComponent', () => {
  let component: SubirInicioComponent;
  let fixture: ComponentFixture<SubirInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirInicioComponent]
    });
    fixture = TestBed.createComponent(SubirInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
