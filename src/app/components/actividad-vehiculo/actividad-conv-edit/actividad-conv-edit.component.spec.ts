import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadConvEditComponent } from './actividad-conv-edit.component';

describe('ActividadConvEditComponent', () => {
  let component: ActividadConvEditComponent;
  let fixture: ComponentFixture<ActividadConvEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadConvEditComponent]
    });
    fixture = TestBed.createComponent(ActividadConvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
