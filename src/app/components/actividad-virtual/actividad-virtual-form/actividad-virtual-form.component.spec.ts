import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadVirtualFormComponent } from './actividad-virtual-form.component';

describe('ActividadVirtualFormComponent', () => {
  let component: ActividadVirtualFormComponent;
  let fixture: ComponentFixture<ActividadVirtualFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadVirtualFormComponent]
    });
    fixture = TestBed.createComponent(ActividadVirtualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
