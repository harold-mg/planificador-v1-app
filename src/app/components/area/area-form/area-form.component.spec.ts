import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFormComponent } from './area-form.component';

describe('RegistrarAreaComponent', () => {
  let component: AreaFormComponent;
  let fixture: ComponentFixture<AreaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaFormComponent]
    });
    fixture = TestBed.createComponent(AreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
