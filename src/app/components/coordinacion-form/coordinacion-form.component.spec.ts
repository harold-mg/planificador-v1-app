import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionFormComponent } from './coordinacion-form.component';

describe('CoordinacionFormComponent', () => {
  let component: CoordinacionFormComponent;
  let fixture: ComponentFixture<CoordinacionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinacionFormComponent]
    });
    fixture = TestBed.createComponent(CoordinacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
