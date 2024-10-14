import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadEditComponent } from './unidad-edit.component';

describe('UnidadEditComponent', () => {
  let component: UnidadEditComponent;
  let fixture: ComponentFixture<UnidadEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadEditComponent]
    });
    fixture = TestBed.createComponent(UnidadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
