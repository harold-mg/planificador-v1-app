import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesFormComponent } from './operaciones-form.component';

describe('OperacionesFormComponent', () => {
  let component: OperacionesFormComponent;
  let fixture: ComponentFixture<OperacionesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperacionesFormComponent]
    });
    fixture = TestBed.createComponent(OperacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
