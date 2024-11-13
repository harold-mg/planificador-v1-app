import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioListComponent } from './municipio-list.component';

describe('MunicipioListComponent', () => {
  let component: MunicipioListComponent;
  let fixture: ComponentFixture<MunicipioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipioListComponent]
    });
    fixture = TestBed.createComponent(MunicipioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
