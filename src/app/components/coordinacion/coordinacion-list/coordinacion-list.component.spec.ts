import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionListComponent } from './coordinacion-list.component';

describe('CoordinacionListComponent', () => {
  let component: CoordinacionListComponent;
  let fixture: ComponentFixture<CoordinacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinacionListComponent]
    });
    fixture = TestBed.createComponent(CoordinacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
