import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadAuditorioFormComponent } from './actividad-auditorio-form.component';

describe('ActividadAuditorioFormComponent', () => {
  let component: ActividadAuditorioFormComponent;
  let fixture: ComponentFixture<ActividadAuditorioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadAuditorioFormComponent]
    });
    fixture = TestBed.createComponent(ActividadAuditorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
