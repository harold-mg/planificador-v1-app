import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaFormComponent } from './poa-form.component';

describe('PoaFormComponent', () => {
  let component: PoaFormComponent;
  let fixture: ComponentFixture<PoaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoaFormComponent]
    });
    fixture = TestBed.createComponent(PoaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
