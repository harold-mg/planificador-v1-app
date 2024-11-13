import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionEditComponent } from './coordinacion-edit.component';

describe('CoordinacionEditComponent', () => {
  let component: CoordinacionEditComponent;
  let fixture: ComponentFixture<CoordinacionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinacionEditComponent]
    });
    fixture = TestBed.createComponent(CoordinacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
