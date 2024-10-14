import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioFormComponent } from './municipio-form.component';

describe('MunicipioFormComponent', () => {
  let component: MunicipioFormComponent;
  let fixture: ComponentFixture<MunicipioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipioFormComponent]
    });
    fixture = TestBed.createComponent(MunicipioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
