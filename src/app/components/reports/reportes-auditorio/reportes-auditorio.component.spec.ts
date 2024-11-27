import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAuditorioComponent } from './reportes-auditorio.component';

describe('ReportesAuditorioComponent', () => {
  let component: ReportesAuditorioComponent;
  let fixture: ComponentFixture<ReportesAuditorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesAuditorioComponent]
    });
    fixture = TestBed.createComponent(ReportesAuditorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
