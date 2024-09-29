import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSaludFormComponent } from './centro-salud-form.component';

describe('CentroSaludFormComponent', () => {
  let component: CentroSaludFormComponent;
  let fixture: ComponentFixture<CentroSaludFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentroSaludFormComponent]
    });
    fixture = TestBed.createComponent(CentroSaludFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
