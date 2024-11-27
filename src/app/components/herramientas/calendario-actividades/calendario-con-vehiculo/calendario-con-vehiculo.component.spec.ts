import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioActividadesComponent } from './calendario-con-vehiculo.component';

describe('CalendarioActividadesComponent', () => {
  let component: CalendarioActividadesComponent;
  let fixture: ComponentFixture<CalendarioActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioActividadesComponent]
    });
    fixture = TestBed.createComponent(CalendarioActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
