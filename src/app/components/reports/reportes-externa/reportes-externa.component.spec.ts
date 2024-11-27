import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesExternaComponent } from './reportes-externa.component';

describe('ReportesExternaComponent', () => {
  let component: ReportesExternaComponent;
  let fixture: ComponentFixture<ReportesExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesExternaComponent]
    });
    fixture = TestBed.createComponent(ReportesExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
