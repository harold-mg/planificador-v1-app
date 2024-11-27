import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioVirtualComponent } from './calendario-virtual.component';

describe('CalendarioVirtualComponent', () => {
  let component: CalendarioVirtualComponent;
  let fixture: ComponentFixture<CalendarioVirtualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioVirtualComponent]
    });
    fixture = TestBed.createComponent(CalendarioVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
