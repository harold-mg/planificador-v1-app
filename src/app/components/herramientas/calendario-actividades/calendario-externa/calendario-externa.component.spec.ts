import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioExternaComponent } from './calendario-externa.component';

describe('CalendarioExternaComponent', () => {
  let component: CalendarioExternaComponent;
  let fixture: ComponentFixture<CalendarioExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioExternaComponent]
    });
    fixture = TestBed.createComponent(CalendarioExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
