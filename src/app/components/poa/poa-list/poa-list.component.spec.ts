import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaListComponent } from './poa-list.component';

describe('PoaListComponent', () => {
  let component: PoaListComponent;
  let fixture: ComponentFixture<PoaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoaListComponent]
    });
    fixture = TestBed.createComponent(PoaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
