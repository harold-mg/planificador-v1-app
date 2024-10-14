import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadFormComponent } from './unidad-form.component';

describe('RegistrarUnidadComponent', () => {
  let component: UnidadFormComponent;
  let fixture: ComponentFixture<UnidadFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadFormComponent]
    });
    fixture = TestBed.createComponent(UnidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
