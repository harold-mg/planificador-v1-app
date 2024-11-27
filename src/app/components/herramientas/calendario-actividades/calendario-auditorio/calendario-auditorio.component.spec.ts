import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAuditorioComponent } from './calendario-auditorio.component';

describe('CalendarioAuditorioComponent', () => {
  let component: CalendarioAuditorioComponent;
  let fixture: ComponentFixture<CalendarioAuditorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioAuditorioComponent]
    });
    fixture = TestBed.createComponent(CalendarioAuditorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
