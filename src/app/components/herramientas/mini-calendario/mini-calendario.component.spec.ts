import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCalendarioComponent } from './mini-calendario.component';

describe('MiniCalendarioComponent', () => {
  let component: MiniCalendarioComponent;
  let fixture: ComponentFixture<MiniCalendarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniCalendarioComponent]
    });
    fixture = TestBed.createComponent(MiniCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
