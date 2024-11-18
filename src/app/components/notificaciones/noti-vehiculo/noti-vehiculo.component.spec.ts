import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiVehiculoComponent } from './noti-vehiculo.component';

describe('NotiVehiculoComponent', () => {
  let component: NotiVehiculoComponent;
  let fixture: ComponentFixture<NotiVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotiVehiculoComponent]
    });
    fixture = TestBed.createComponent(NotiVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
