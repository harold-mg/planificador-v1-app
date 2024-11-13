import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesEditComponent } from './operaciones-edit.component';

describe('OperacionesEditComponent', () => {
  let component: OperacionesEditComponent;
  let fixture: ComponentFixture<OperacionesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperacionesEditComponent]
    });
    fixture = TestBed.createComponent(OperacionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
