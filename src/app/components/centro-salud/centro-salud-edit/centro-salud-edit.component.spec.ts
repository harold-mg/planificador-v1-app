import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSaludEditComponent } from './centro-salud-edit.component';

describe('CentroSaludEditComponent', () => {
  let component: CentroSaludEditComponent;
  let fixture: ComponentFixture<CentroSaludEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentroSaludEditComponent]
    });
    fixture = TestBed.createComponent(CentroSaludEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
