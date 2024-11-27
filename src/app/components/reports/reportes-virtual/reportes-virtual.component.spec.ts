import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesVirtualComponent } from './reportes-virtual.component';

describe('ReportesVirtualComponent', () => {
  let component: ReportesVirtualComponent;
  let fixture: ComponentFixture<ReportesVirtualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesVirtualComponent]
    });
    fixture = TestBed.createComponent(ReportesVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
