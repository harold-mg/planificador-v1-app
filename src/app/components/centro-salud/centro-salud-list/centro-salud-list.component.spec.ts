import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSaludListComponent } from './centro-salud-list.component';

describe('CentroSaludListComponent', () => {
  let component: CentroSaludListComponent;
  let fixture: ComponentFixture<CentroSaludListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentroSaludListComponent]
    });
    fixture = TestBed.createComponent(CentroSaludListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
