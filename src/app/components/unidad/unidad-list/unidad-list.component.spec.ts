import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadListComponent } from './unidad-list.component';

describe('UnidadListComponent', () => {
  let component: UnidadListComponent;
  let fixture: ComponentFixture<UnidadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadListComponent]
    });
    fixture = TestBed.createComponent(UnidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
