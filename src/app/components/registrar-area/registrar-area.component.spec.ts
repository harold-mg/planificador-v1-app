import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAreaComponent } from './registrar-area.component';

describe('RegistrarAreaComponent', () => {
  let component: RegistrarAreaComponent;
  let fixture: ComponentFixture<RegistrarAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarAreaComponent]
    });
    fixture = TestBed.createComponent(RegistrarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
